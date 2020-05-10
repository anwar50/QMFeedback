from rest_framework import serializers
from feedbackapp.models import Module
from feedbackapp.models import Test
from feedbackapp.models import TeacherProfile
from feedbackapp.models import Grade
from feedbackapp.models import FeedbackBankTwo
from feedbackapp.models import Feedback
from feedbackapp.models import UserTest
from feedbackapp.models import SavedFeedback
from feedbackapp.models import AnswersBank
from feedbackapp.models import ImprovementFeedback
from django.contrib.auth.models import User

class TeacherUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ('id','user','title', 'year_of_module','code','description', 'num_students')
        
class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'
class AnswersBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswersBank
        fields = '__all__'
class UserTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = ('id', 'test', 'username')
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('feedback', 'test')
class FeedbackGeneratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackBankTwo
        fields = ('feedback_bank', 'category', 'percentage')
class SavedTestFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedFeedback
        fields = '__all__'
class SavedImprovementFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImprovementFeedback
        fields = '__all__'