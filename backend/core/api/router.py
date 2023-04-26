
from rest_framework.routers import DefaultRouter

from users.api.views.user_view import UserViewset
from plantations.api.views.plantation_views import PlantationViewSet
# from plantations.api.views.ground_views import GroundViewSet
from plantations.api.views.views import IrrigationViewSet
# from workspaces.api.views.workspaces_views import WorkspacesViewset

router = DefaultRouter()

router.register('users', UserViewset, basename='users')
router.register('plantations', PlantationViewSet, basename='plantations')
# router.register('grounds', GroundViewSet, basename='grounds')
router.register('irrigations', IrrigationViewSet, basename='irrigations')
# router.register('workspaces', WorkspacesViewset, basename='workspaces')

urlpatterns = router.urls