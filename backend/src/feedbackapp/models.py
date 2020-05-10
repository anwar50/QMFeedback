from django.db import models
import datetime
from django.contrib.auth.models import AbstractUser, User
from django.template.defaultfilters import slugify
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from nose.tools import nottest
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here. 
class Module(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    year_of_module = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)])
    code = models.CharField(max_length=50, default="", editable=True)
    description = models.TextField()
    num_students = models.IntegerField(default=0, null=True)
    def __str__(self):
        return self.title
class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=200, default='EECS')
    user_type = models.CharField(max_length=200, default='teacher')
    avatar = models.CharField(max_length=200, default="None")
    def __str__(self):
        return self.user.username
@nottest
class Test(models.Model):
    name = models.CharField(max_length=1000)
        #number of questions has to be up to 10 questions
    test_count = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
        #can only be maximum 10 sub questions
    num_subquestions = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    description = models.CharField(max_length=70, default="None")
    created_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
        #Multiple choice questions (MCQs) OR True/False questions OR Short Answer Questions OR Skeleton questions!
    questiontype = models.CharField(max_length=50, default="None", editable=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    class Meta:
        ordering = ['created_date', ]
        verbose_name_plural = "Tests"
    def __str__(self):
        return self.name
@nottest
class UserTest(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    username = models.CharField(max_length=70, default="None")
    def __str__(self):
        return str(self.username)
class Grade(models.Model):
    grade = models.CharField(max_length=50, default="", editable=True)
    grade_mark = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    effectiveness = models.CharField(max_length=50, default="", editable=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.grade)
class FeedbackBank(models.Model):
    feedback_bank = models.CharField(max_length=500, default="", editable=True)
    category = models.CharField(max_length=10, default="", editable=True)
    def __str__(self):
        return self.feedback_bank
class FeedbackBankTwo(models.Model):
    feedback_bank = models.CharField(max_length=100000, default="", editable=True)
    category = models.CharField(max_length=10, default="", editable=True)
    percentage = models.IntegerField(default=0, null=True)
    def __str__(self):
        return self.feedback_bank
class Feedback(models.Model):
    feedback = models.CharField(max_length=500, default="None", editable=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    def __str__(self):
        return self.feedback
    '''The saved feedbacks are stored in this model'''
class SavedFeedback(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    user = models.CharField(max_length=70, default="None")
    feedback = models.CharField(max_length=500, default="None", editable=True)
    percentage = models.IntegerField(default=0, null=True)
    created_by = models.CharField(max_length=100, default="None", editable=True)
    def __str__(self):
        return str(self.feedback + " " + self.user)
    '''This model stores the information about the improvement feedback'''
class ImprovementFeedback(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    area_of_improvement = models.CharField(max_length=70, default="None")
    user = models.CharField(max_length=70, default="None")
    improvement_feedback = models.CharField(max_length=10000, default="None", editable=True)
    def __str__(self):
        return str(self.area_of_improvement)
class PreProcessedData(models.Model):
    processed_feedback = models.CharField(max_length=100000, default="None")
    rating = models.IntegerField(default=0, null=True)
    def __str__(self):
        return str(self.processed_feedback)
    '''Answer bank model stores the information about the test breakdown'''
class AnswersBank(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    total_mark_for_question = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    topics = models.CharField(max_length=100000, default="None")
    total_sub_marks = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    topic_mark_breakdown = models.CharField(max_length=100000, default="None")
    weakest_topic = models.CharField(max_length=100000, default="None")
    def __str__(self):
        return str(self.total_mark_for_question)

