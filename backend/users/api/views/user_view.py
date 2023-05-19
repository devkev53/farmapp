from django.shortcuts import get_object_or_404

from rest_framework.decorators import action, permission_classes
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.api.views.api_views import PermisionPolicyMixin


from users.api.serializers.user_serializers import UserSerializer, UserUpdateSerializer, UserListSerializer, CreateUserSerializer, PasswordSerializer

# class UserViewset(viewsets.GenericViewSet):
class UserViewset(PermisionPolicyMixin, viewsets.GenericViewSet):
    serializer_class = UserListSerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_per_method = {
        "list": [IsAuthenticated,],
        "retrieve": [IsAuthenticated,],
        "update": [IsAuthenticated,],
        "destroy": [IsAuthenticated,],
        "create": [],
        "change_img": [IsAuthenticated,],
        "set_password": [IsAuthenticated,]
    }

    def get_queryset(self, pk=None):
        ''' Obtain the queryset an validate with PK '''

        print(self.queryset)
        if self.queryset is None:
            return self.serializer_class().Meta.model.objects.filter(is_active=True)
        return self.queryset

    def get_object(self, pk):
        return get_object_or_404(self.serializer_class.Meta.model, pk=pk)
    
    # List all active Users
    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    # Create a new User
    def create(self, request):
        user_serializer = CreateUserSerializer(data=request.data)
        
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response({
        'error':'check your fields', 'errors':user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # List Detail a User
    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)

    # Update a User
    def update(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = UserUpdateSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response({
        'error':'check your fields', 'errors':user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # Delete a User (No Delete to DB is a logical change the status)
    def destroy(self, request, pk=None):
        user_destroy = self.serializer_class.Meta.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({'message':'user deactivate successful'})
        return Response({'error':'user not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['put'], url_path='assets/profile')
    def change_img(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = UserUpdateSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response({
            'error':'check your fields', 'errors':user_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='change_password')
    def set_password(self, request, pk=None, *args, **kwargs):
        user = self.get_object(pk)
        password_serializer = PasswordSerializer(data = request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data['password'])
            user.save()
            return Response({'message': 'Password updated successfull'}, status=status.HTTP_200_OK)
        return Response({
            'error':'check your fields', 'errors':password_serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
