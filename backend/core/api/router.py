
from rest_framework.routers import DefaultRouter

from users.api.views.user_view import UserViewset
from plantations.api.views.plantation_views import PlantationViewSet
# from plantations.api.views.ground_views import StateGroundViewSet
from plantations.api.views.irrigations_views import IrrigationViewSet, StateIrrigationViewSet
# from workspaces.api.views.workspaces_views import WorkspacesViewset

router = DefaultRouter()

router.register('users', UserViewset, basename='users')
router.register('plantations', PlantationViewSet, basename='plantations')
# router.register('ground', StateGroundViewSet, basename='ground')
router.register('irrigations', IrrigationViewSet, basename='irrigations')
router.register('state-irrigations', StateIrrigationViewSet, basename='state_irrigations')
# router.register('workspaces', WorkspacesViewset, basename='workspaces')

urlpatterns = router.urls