from rest_framework import serializers
from .models import Profile

class ProfileSerializers(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'bio', 'date_of_birth', 'profile_pic']