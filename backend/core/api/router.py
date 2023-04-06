
from rest_framework.routers import DefaultRouter

from users.api.views.user_view import UserViewset
# from workspaces.api.views.workspaces_views import WorkspacesViewset

router = DefaultRouter()

router.register('users', UserViewset, basename='users')
# router.register('workspaces', WorkspacesViewset, basename='workspaces')

urlpatterns = router.urls