
from rest_framework.routers import DefaultRouter

from users.api.views.user_view import UserViewset
from plantations.api.views.plantation_views import PlantationViewSet
from plantations.api.views.irrigations_views import IrrigationViewSet, StateIrrigationViewSet, ManualActiveIrrgation

router = DefaultRouter()

router.register('users', UserViewset, basename='users')
router.register('plantations', PlantationViewSet, basename='plantations')
router.register('irrigations', IrrigationViewSet, basename='irrigations')
router.register('irrigations', ManualActiveIrrgation, basename='active_irrigation')
router.register('state-irrigations', StateIrrigationViewSet, basename='state_irrigations')

urlpatterns = router.urls