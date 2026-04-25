from rest_framework import serializers

from .models import IPadCategory, IPadModel, Review, Vote


class IPadSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPadModel
        fields = "__all__"


class IPadCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IPadCategory
        fields = "__all__"


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
