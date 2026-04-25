from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Review


class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Email")

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["name", "email", "text", "rating"]
        widgets = {
            "text": forms.Textarea(attrs={"rows": 4}),
            "rating": forms.Select(choices=[(i, "★" * i) for i in range(1, 6)]),
        }
