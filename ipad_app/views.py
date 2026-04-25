import json
import logging

from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt

from .forms import ReviewForm, SignUpForm
from .models import IPadModel, Review, Vote

logger = logging.getLogger(__name__)


def home(request):
    ipads = IPadModel.objects.all()
    votes = Vote.objects.values("ipad_model").annotate(total=Count("id"))
    votes_dict = {v["ipad_model"]: v["total"] for v in votes}
    logger.info("Главная страница посещена. Пользователь: %s", request.user)
    return render(request, "index.html", {"ipads": ipads, "votes": votes_dict})


def specs(request):
    ipad = IPadModel.objects.first()
    return render(request, "specs.html", {"ipad": ipad})


def gallery(request):
    ipads = IPadModel.objects.all()
    return render(request, "gallery.html", {"ipads": ipads})


def why_ipad(request):
    return render(request, "why.html")


def accessories(request):
    return render(request, "accessories.html")


def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            logger.info("Новый пользователь зарегистрирован: %s", user.username)
            messages.success(request, "Регистрация успешна!")
            return redirect("home")
    else:
        form = SignUpForm()
    return render(request, "registration/signup.html", {"form": form})


@login_required
def leave_review(request):
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save()
            logger.info("Новый отзыв от %s", review.name)
            messages.success(request, "Спасибо за отзыв!")
            return redirect("home")
    else:
        form = ReviewForm()
    return render(request, "review.html", {"form": form})


@csrf_exempt
def vote_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        model = data.get("model")

        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key

        existing_vote = Vote.objects.filter(session_key=session_key).first()
        if existing_vote:
            return JsonResponse({"success": False, "message": "Вы уже голосовали!"})

        Vote.objects.create(
            ipad_model=model,
            user=request.user if request.user.is_authenticated else None,
            session_key=session_key,
        )

        votes = Vote.objects.values("ipad_model").annotate(total=Count("id"))
        votes_dict = {v["ipad_model"]: v["total"] for v in votes}
        logger.info("Новый голос за модель: %s", model)
        return JsonResponse({"success": True, "votes": votes_dict})

    votes = Vote.objects.values("ipad_model").annotate(total=Count("id"))
    return JsonResponse({v["ipad_model"]: v["total"] for v in votes})


@csrf_exempt
def get_reviews_api(request):
    reviews = Review.objects.all().values("name", "text", "rating", "created_at")
    return JsonResponse(list(reviews), safe=False)
