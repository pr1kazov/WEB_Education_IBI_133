from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("specs/", views.specs, name="specs"),
    path("gallery/", views.gallery, name="gallery"),
    path("why/", views.why_ipad, name="why"),
    path("accessories/", views.accessories, name="accessories"),
    path("signup/", views.signup, name="signup"),
    path("review/", views.leave_review, name="review"),
    path("api/vote/", views.vote_api, name="vote_api"),
    path("api/reviews/", views.get_reviews_api, name="reviews_api"),
]
