from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class IPadCategory(models.Model):
    name = models.CharField("Название категории", max_length=100)
    slug = models.SlugField("URL", unique=True)
    description = models.TextField("Описание категории", blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория iPad"
        verbose_name_plural = "Категории iPad"


class IPadModel(models.Model):
    name = models.CharField("Название модели", max_length=100)
    slug = models.SlugField("URL", unique=True)
    description = models.TextField("Описание")
    image = models.ImageField("Изображение", upload_to="ipads/", blank=True, null=True)
    category = models.ForeignKey(
        IPadCategory, on_delete=models.SET_NULL, null=True, verbose_name="Категория"
    )
    display = models.CharField("Дисплей", max_length=200)
    processor = models.CharField("Процессор", max_length=100)
    memory = models.CharField("Память", max_length=100)
    camera = models.CharField("Камера", max_length=200)
    battery = models.CharField("Батарея", max_length=100)
    weight = models.CharField("Вес", max_length=50)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2, default=0)
    release_date = models.DateField("Дата выхода", default=timezone.now)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "iPad"
        verbose_name_plural = "iPad'ы"
        ordering = ["-release_date"]


class Vote(models.Model):
    MODEL_CHOICES = [
        ("pro", "iPad Pro"),
        ("air", "iPad Air"),
        ("mini", "iPad mini"),
        ("base", "iPad (базовая модель)"),
    ]
    ipad_model = models.CharField("Модель iPad", max_length=10, choices=MODEL_CHOICES)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь", null=True, blank=True
    )
    session_key = models.CharField("Ключ сессии", max_length=40, null=True, blank=True)
    created_at = models.DateTimeField("Дата голосования", auto_now_add=True)

    def __str__(self):
        return f"Голос за {self.get_ipad_model_display()}"

    class Meta:
        verbose_name = "Голос"
        verbose_name_plural = "Голоса"


class Review(models.Model):
    name = models.CharField("Имя", max_length=100)
    email = models.EmailField("Email")
    text = models.TextField("Отзыв", max_length=5000)
    rating = models.IntegerField("Рейтинг", choices=[(i, str(i)) for i in range(1, 6)])
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    def __str__(self):
        return f"Отзыв от {self.name}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-created_at"]
