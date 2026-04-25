from django.contrib import admin

from .models import IPadCategory, IPadModel, Review, Vote


@admin.register(IPadCategory)
class IPadCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(IPadModel)
class IPadModelAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "release_date"]
    list_filter = ["category", "release_date"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ["ipad_model", "user", "created_at"]
    list_filter = ["ipad_model", "created_at"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["name", "rating", "created_at"]
    list_filter = ["rating", "created_at"]
