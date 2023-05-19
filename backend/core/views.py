import string
from django.http import Http404, HttpResponse

from django.utils.crypto import get_random_string
from .tasks import say_hello, send_email_func
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated


from core.models import User
from plantations.models import Plantation, Irrigation, State_Ground, State_Irrigation

from django.template.loader import render_to_string

from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration



# Create your views here.



def create_user_random(cantidad):
    for x in range(cantidad):
        username = 'usuario_{}'.format(get_random_string(5, string.ascii_letters))
        email = '{}@miumg.com'.format(username)
        password = 'abc123/-'
        User.objects.create_user(
            username=username, email=email, password=password
            )
    return '{} Usuarios creados exitosamente..!'.format(cantidad)


def test(request):
    say_hello()
    return HttpResponse('Done Test')

def send_mail_to_all(request):
    send_email_func()
    return HttpResponse('Sending emails')


# def report_all_pdf(request):
#     print(request)
#     render_plantation = []
#     plantations = Plantation.objects.filter(is_active=True).all()
#     for plantation in plantations:
#         plant = {}
#         plant['name'] = plantation.name
#         plant['created'] = plantation.created
#         plant['created_by'] = plantation.created_by
#         plant['description'] = plantation.description
#         plant['duration'] = plantation.duration
#         plant['total_water'] = plantation.total_water
#         plant['irrigations'] = Irrigation.objects.filter(plantation=plantation)
#         render_plantation.append(plant) 
#     context = {
#         "plantations": render_plantation,
#     }
#     html = render_to_string("core/report-pdf.html", context)
#     # css_url = 'static/core/bootstrap/css/bootstrap.min.css'

#     response = HttpResponse(content_type="application/pdf")
#     response["Content-Disposition"] = "inline; report.pdf"

#     font_config = FontConfiguration()
#     HTML(string=html).write_pdf(response, font_config=font_config)

#     return response


class PlantationPFD(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk=None, *args, **kwargs):
        
        try:
            user_request = User.objects.filter(username=request.user).get()
        except:
            user_request = 'test'
        try:
            plantation = Plantation.objects.get(id=pk)
            irrigations = Irrigation.objects.filter(plantation=plantation)
            ground_states = State_Ground.objects.filter(plantation=plantation)
            irrigations_states = State_Irrigation.objects.filter(plantation=plantation)

            context = {

                "plantation": plantation,
                "irrigations": irrigations,
                "ground_states": ground_states,
                "irrigations_states": irrigations_states,
                "requestUser": user_request,
            }
            
            html = render_to_string("plantations/plantation_info-pdf.html", context)

            response = HttpResponse(content_type="application/pdf")
            response["Content-Disposition"] = "inline; report.pdf"

            font_config = FontConfiguration()
            HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

            return response
        except:
            raise Http404("Plantation does no exist")

class ReportaAllPDFAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        
        try:
            user_request = User.objects.filter(username=request.user).get()
        except:
            user_request = 'test'
        
        render_plantation = []

        start = request.data['start_date']
        end = request.data['end_date']
        if start == '' or end == '' :
            plantations = Plantation.objects.filter(is_active=True).all()
            start = None
            end = None   
        else:
            plantations = Plantation.objects.filter(is_active=True, created__gte=start, created__lte=end).all()
        for plantation in plantations:
            plant = {}
            plant['name'] = plantation.name
            plant['created'] = plantation.created
            plant['created_by'] = plantation.created_by
            plant['description'] = plantation.description
            plant['duration'] = plantation.duration
            plant['total_water'] = plantation.total_water
            plant['irrigations'] = Irrigation.objects.filter(plantation=plantation)
            render_plantation.append(plant) 
        context = {
            "plantations": render_plantation,
            "requestUser": user_request,
            "start": start,
            "end":end
        }
        html = render_to_string("core/report-pdf.html", context)
        # css_url = 'static/core/bootstrap/css/bootstrap.min.css'

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = "inline; report.pdf"

        font_config = FontConfiguration()
        HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

        return response