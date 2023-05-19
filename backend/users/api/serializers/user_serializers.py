from django.utils.translation import gettext as _
from django.contrib.auth import get_user_model, authenticate
from users.models import User
from rest_framework import serializers
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomUserSerialzer(serializers.ModelSerializer):
    url_img = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'name', 'last_name',
            'image', 'url_img', 'phone', 'address', 'birthday'
        )
    
    def url_img(self, obj):
        return obj.url_img

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'name', 'last_name')

    def create(self, validate_data):
      """ Create a new User"""
      return get_user_model().objects.create_user(**validate_data)


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'name', 'last_name',
            'image', 'url_img', 'phone', 'address', 'birthday'
        )

class UserListSerializer(serializers.ModelSerializer):
    url_img = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'name', 'last_name',
            'image', 'url_img', 'phone', 'address', 'birthday'
        )
    
    def url_img(self, obj):
        return obj.url_img

    # def create(self, validate_data):
    #   """ Create a new User"""
    #   return get_user_model().objects.create_user(**validate_data)

class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'name', 'last_name', 'phone', 'address', 'image')

    def create(self, validate_data):
      """ Create a new User"""
      return get_user_model().objects.create_user(**validate_data)

class ChangeImageUserSerialzier(serializers.Serializer):
    image = serializers.ImageField()

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("The passwor is diferrent")
        return data