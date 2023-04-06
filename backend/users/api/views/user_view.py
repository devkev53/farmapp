from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from users.api.serializers.user_serializers import UserSerializer, UserUpdateSerializer, UserListSerializer

class UserViewset(viewsets.GenericViewSet):
    serializer_class = UserListSerializer
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk=None):
        ''' Obtain the queryset an validate with PK '''

        print(self.queryset)
        if self.queryset is None:
            return self.serializer_class().Meta.model.objects.filter(is_active=True)
        return self.queryset

    def get_object(self, pk):
        return get_object_or_404(self.serializer_class.Meta.model, pk=pk)
    
    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        user_serializer = UserSerializer(data=request.data)
        
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response({
        'error':'check your fields', 'errors':user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)


    def update(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = UserUpdateSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'message':'user updated successful'})
        return Response({
        'error':'check your fields', 'errors':user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        user_destroy = self.serializer_class.Meta.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({'message':'user deactivate successful'})
        return Response({'error':'user not found'}, status=status.HTTP_404_NOT_FOUND)