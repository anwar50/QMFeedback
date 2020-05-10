from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView, PasswordResetDoneView, PasswordResetView, PasswordResetConfirmView
from django.contrib.auth import views as auth_views
from .views import (
    ModuleListView, 
    ModuleDetailView, 
    ModuleCreateView,
    ModuleUpdateView,
    ModuleDeleteView,
    TestDetailView, 
    TestListView,
    TestCreateView,
    TestUpdateView,
    TestDeleteView,
    GradeCreateView,
    GradeDeleteView,
    GradeDetailView,
    GradeListView,
    GradeUpdateView,
    TeacherProfileListView,
    TeacherProfileCreateView,
    TeacherProfileUpdateView,
    FeedbackCreateView,
    FeedbackDeleteView,
    FeedbackDetailView,
    FeedbackListView,
    FeedbackUpdateView,
    SavedTestListView,
    SavedTestCreateView,
    SavedFeedbackListView,
    SavedFeedbackCreateView,
    SavedFeedbackDeleteView,
    SavedFeedbackDetailView,
    SavedFeedbackUpdateView,
    SavedImprovementFeedbackCreateView,
    SavedImprovementFeedbackDeleteView,
    SavedImprovementFeedbackDetailView,
    SavedImprovementFeedbackListView,
    SavedImprovementFeedbackUpdateView,
    AnswersBankCreateView,
    AnswersBankDeleteView,
    AnswersBankDetailView,
    AnswersBankListView,
    AnswersBankUpdateView,
    CurrentUserViewSet,
    ProcessData
)

urlpatterns = [
        #users profile
    path('users', CurrentUserViewSet.as_view(), name="users"),
    ##profile set up
    path('list/profile/', TeacherProfileListView.as_view(), name="profile"),
    path('profile/', TeacherProfileCreateView.as_view(), name="createprofile"),
    path('profile/<pk>/update/', TeacherProfileUpdateView.as_view(), name="updateprofile"),
        ##module url
    path('modules', ModuleListView.as_view(), name="modules"),
    path('create/module/', ModuleCreateView.as_view(), name="createmodule"),
    path('module/<pk>', ModuleDetailView.as_view(), name="detailmodule"),
    path('module/<pk>/update/', ModuleUpdateView.as_view(), name="updatemodule"),
    path('module/<pk>/delete/', ModuleDeleteView.as_view(), name="deletemodule"),
        ##test url
    path('test', TestListView.as_view(), name="tests"),
    path('create/test/', TestCreateView.as_view(), name="createtest"),
    path('test/<pk>', TestDetailView.as_view(), name="detailtest"),
    path('test/<pk>/update/', TestUpdateView.as_view(), name="updatetest"),
    path('test/<pk>/delete/', TestDeleteView.as_view(), name="deletetest"),
        ##answers url
    path('answers', AnswersBankListView.as_view(), name="answers"),
    path('create/answer/', AnswersBankCreateView.as_view(), name="createanswer"),
    path('answer/<pk>', AnswersBankDetailView.as_view(), name="detailanswer"),
    path('answer/<pk>/update/', AnswersBankUpdateView.as_view(), name="updateanswer"),
    path('answer/<pk>/delete/', AnswersBankDeleteView.as_view(), name="deleteanswer"),
        ##grade url
    path('grades', GradeListView.as_view(), name="grades"),
    path('create/grade/', GradeCreateView.as_view(), name="creategrade"),
    path('grade/<pk>', GradeDetailView.as_view(), name="detailgrade"),
    path('grade/<pk>/update/', GradeUpdateView.as_view(), name="updategrade"),
    path('grade/<pk>/delete/', GradeDeleteView.as_view(), name="deletegrade"),
        ##feedback url
    path('feedback', FeedbackListView.as_view(), name="feedback"),
    path('create/feedback/', FeedbackCreateView.as_view(), name="createfeedback"),
    path('feedback/<pk>', FeedbackDetailView.as_view(), name="detailfeedback"),
    path('feedback/<pk>/update/', FeedbackUpdateView.as_view(), name="updatefeedback"),
    path('feedback/<pk>/delete/', FeedbackDeleteView.as_view(), name="deletefeedback"),
        ##save test information
    path('savedtests', SavedTestListView.as_view(), name="savedtest"),
    path('save/test/', SavedTestCreateView.as_view(), name="createsavedtest"),
        ##save feedback information
    path('savedfeedbacks', SavedFeedbackListView.as_view(), name="savedfeedback"),
    path('save/feedback/', SavedFeedbackCreateView.as_view(), name="createsavedfeedback"),
    path('savedfeedback/<pk>', SavedFeedbackDetailView.as_view(), name="detailsavedfeedback"),
    path('savedfeedback/<pk>/update/', SavedFeedbackUpdateView.as_view(), name="updatesavedfeedback"),
    path('savedfeedback/<pk>/delete/', SavedFeedbackDeleteView.as_view(), name="deletesavedfeedback"),
        ##save improvement feedback information
    path('savedimprovements', SavedImprovementFeedbackListView.as_view(), name="savedimprovementfeedback"),
    path('save/improvement/', SavedImprovementFeedbackCreateView.as_view(), name="createimprovement"),
    path('savedimprovements/<pk>', SavedImprovementFeedbackDetailView.as_view(), name="detailimprovement"),
    path('savedimprovements/<pk>/update/', SavedImprovementFeedbackUpdateView.as_view(), name="updateimprovement"),
    path('savedimprovements/<pk>/delete/', SavedImprovementFeedbackDeleteView.as_view(), name="deleteimprovement"),
        #process the sentiment analysis
    path('processnltk/<test>/<grade>/<mark>/<correct>/<incorrect>/<effectiveness>', ProcessData.as_view(), name="processnltk"),
        ##generated Feedback category
    path('generatedFeedback', FeedbackListView.as_view(), name="generatefeedback"),
    path('password-reset/', auth_views.PasswordResetView.as_view(), name="password_reset"),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),
    
]