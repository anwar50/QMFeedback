from django.contrib import admin
from .models import Module
# from .models import Question
from .models import Test
from .models import FeedbackBankTwo, FeedbackBank
from .models import Grade, TeacherProfile
from .models import Feedback
from .models import UserTest
from .models import SavedFeedback
from .models import PreProcessedData
from .models import AnswersBank
from .models import ImprovementFeedback

# Register your models here.
admin.site.register(Module)
admin.site.register(Test)
admin.site.register(FeedbackBank)
admin.site.register(FeedbackBankTwo)
admin.site.register(Grade)
admin.site.register(TeacherProfile)
admin.site.register(Feedback)
admin.site.register(UserTest)
admin.site.register(SavedFeedback)
admin.site.register(PreProcessedData)
admin.site.register(AnswersBank)
admin.site.register(ImprovementFeedback)
