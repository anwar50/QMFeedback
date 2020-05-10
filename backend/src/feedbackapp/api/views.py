from feedbackapp.models import Module, Test, TeacherProfile, Grade, UserTest, Feedback, FeedbackBankTwo, SavedFeedback, AnswersBank,ImprovementFeedback
from django.contrib.auth.models import User
from django.views import View
from rest_framework import viewsets
from .serializer import (
    ModuleSerializer, 
    TestSerializer, 
    ProfileSerializer, 
    GradeSerializer,
    UserFeedbackSerializer,
    UserTestSerializer,
    SavedTestFeedbackSerializer,
    TeacherUserSerializer,
    AnswersBankSerializer,
    SavedImprovementFeedbackSerializer,
    FeedbackGeneratorSerializer
)
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
    #importing libraries for sentiment analysis.
import nltk
nltk.download('all')
import warnings 
import glob
import pandas as pd
import numpy as np
from nltk.sentiment import SentimentIntensityAnalyzer
#from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
#from wordcloud import WordCloud
import matplotlib.pyplot as plt
import gzip
import json, string
warnings.filterwarnings("ignore")
def Features(list_words):
        return dict([(word, True) for word in list_words])
from rest_framework.generics import (
    ListAPIView, 
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
def SentimentalScore(line):
    analyzer = SentimentIntensityAnalyzer()
    pol_score = analyzer.polarity_scores(line)
    print("analysing sentence...")
                #shows the vader performance on a given feedback review.
    #print("{:-<40} {}".format(line, str(pol_score)))
    print("polarity score: " + str(pol_score))
    print("making prediction...")
    sentiment_score = pol_score['compound']
                #categorizes the feedback based on the sentiment score returned by the compound score.
    if sentiment_score >= 0.5:
        return 'positive'
    elif (sentiment_score > -0.5) and (sentiment_score < 0.5):
        return 'neutral'
    elif sentiment_score <= -0.5:
        return 'negative'
test_sentence = "It is very clear that Muhammad needs to cover a lot of content as he did not even attempt the questions"
sentiment_category = SentimentalScore(test_sentence)
print("output: " + sentiment_category)
    #user views
class CurrentUserViewSet(ListAPIView):
    queryset = User.objects.all()
    serializer_class = TeacherUserSerializer
    ##module views
class ModuleListView(ListAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleDetailView(RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleCreateView(CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleUpdateView(UpdateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleDeleteView(DestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    ##Test views
class TestListView(ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestDetailView(RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestCreateView(CreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestUpdateView(UpdateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestDeleteView(DestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    ##answersBank
class AnswersBankListView(ListAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankDetailView(RetrieveAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankCreateView(CreateAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankUpdateView(UpdateAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankDeleteView(DestroyAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
#     ##grade views
class GradeListView(ListAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeDetailView(RetrieveAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeCreateView(CreateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeUpdateView(UpdateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeDeleteView(DestroyAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    #saved testss from user
class SavedTestListView(ListAPIView):
    queryset = UserTest.objects.all()
    serializer_class = UserTestSerializer
class SavedTestCreateView(CreateAPIView):
    queryset = UserTest.objects.all()
    serializer_class = UserTestSerializer
#     #     ##feedback views
class FeedbackListView(ListAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackDetailView(RetrieveAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackCreateView(CreateAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackUpdateView(UpdateAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackDeleteView(DestroyAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
    #save the test feedback
class SavedFeedbackListView(ListAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackCreateView(CreateAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackDetailView(RetrieveAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackUpdateView(UpdateAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackDeleteView(DestroyAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
 #save the improvement feedback
class SavedImprovementFeedbackListView(ListAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackCreateView(CreateAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackDetailView(RetrieveAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackUpdateView(UpdateAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackDeleteView(DestroyAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
 #signup views..
class TeacherProfileListView(ListAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = ProfileSerializer
class TeacherProfileCreateView(CreateAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = ProfileSerializer
class TeacherProfileUpdateView(UpdateAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = ProfileSerializer
    #Trains the model when the test results are given from the teacher.
class ProcessData(View):
    def get(self, request, test, grade, mark, correct, incorrect, effectiveness):
        totalMarks = int(incorrect) + int(correct) #total marks for the test
        upper_marks = int(0.75*totalMarks) #75% of total
        lower_marks = int(0.25*totalMarks) #25% of total        
        middle_mark = int(totalMarks/2) #half of total 
            #arrays used to store the feedbacks generated based on calculations
        Alltop_90 = []
        Alltop_80 = []
        Alltop_70 = []
        Alltop_60 = []
        Alltop_50 = []
        Alltop_40 = []
        Alltop_Fail = []
            #top improvment feedbacks for all grades which will be later stored in a new object
        top_improv = []
        #importing the file from local directory
        file = glob.glob('C:\\Users\\anwardont delete my\\Documents\\Datasets\\Review.json')
            #process the data from the json file and store in array for the model
        Reviews = []
            #process the reviews from the json file "Review"
        with open(file[0]) as data:
            read_data = data.read()
            for review in read_data.split('\n'):
                Reviews.append(review)
        reviewFrame = []
            #use the first 2 million reviews in the reviews dataset and processes the data from json into a list of tuples
        for review in Reviews[:5000]:
            try:
                jsondata = json.loads(review)
                reviewFrame.append((jsondata['reviewerID'], jsondata['asin'], 
                    jsondata['reviewerName'], 
                    jsondata['helpful'][0], 
                    jsondata['helpful'][1], 
                    jsondata['reviewText'], 
                    jsondata['overall'], 
                    jsondata['summary'], 
                    jsondata['unixReviewTime'],
                     jsondata['reviewTime']))
            except:
                pass

        #making a dataframe using the list of tuples created earlier
        new_dataset = pd.DataFrame(reviewFrame, 
            columns=['Reviewer_ID',
            'Asin',
            'Reviewer_Name',
            'helpful_UpVote',
            'Total_Votes',
            'Review_Text','Rating','Summary',
            'Unix_Review_Time',
            'Review_Time'])
        #making a dataframe using the list of tuples created earlier
        dataset_two = pd.DataFrame(reviewFrame, columns=['Reviewer_ID','Asin','Reviewer_Name','helpful_UpVote','Total_Votes','Review_Text','Rating','Summary','Unix_Review_Time','Review_Time'])

                ######################### CALCULATION OF SENTIMENT THROUGH SENTIMENT INTENSITY ANALYZER ###############
       #creating a compound score for each review
        def SentimentScore(line):
            sentiment_analyzer = SentimentIntensityAnalyzer()
            pol_score = sentiment_analyzer.polarity_scores(line)
            sentiment_score = pol_score['compound']
            return sentiment_score
        #return the sentiment category based on the review analysis
        def SentimentScoreCategory(line):
            sentiment_analyzer = SentimentIntensityAnalyzer()
            pol_score = sentiment_analyzer.polarity_scores(line)
                #shows the vader performance on a given feedback review.
            #print("{:-<40} {}".format(line, str(pol_score)))
            sentiment_score = pol_score['compound']

            '''categorizes the feedback based on the sentiment score 
            # returned by the compound score.'''
            if sentiment_score >= 0.5:
                return 'positive'
            elif (sentiment_score > -0.5) and (sentiment_score < 0.5):
                return 'neutral'
            elif sentiment_score <= -0.5:
                return 'negative'

        print("#################################################")
        Training_Data = new_dataset.head(10000)
            #calculate the sentiment score and store new column called
        Training_Data['Sentiment_Score'] = Training_Data['Review_Text'].apply(lambda x: SentimentScore(x))
        Training_Data['Sentiment_Category'] = Training_Data['Review_Text'].apply(lambda x: SentimentScoreCategory(x))
            #sort the results in ascending order
        Training_Data = Training_Data.sort_values('Sentiment_Score', ascending=True)
        
            #collect the rating and the reviews
        ratings = Training_Data['Rating']
        reviews = Training_Data['Review_Text']
        
            #collect the category and scores
        sentiment_cat = Training_Data['Sentiment_Category']
        sentiment_score = Training_Data['Sentiment_Score']

            ######## RATING OF THE FEEDBACK IS ALSO COMPARED WITH THE NUMBER OF INCORRECT!!
            ######## OF RATING IS 4 THEN LOW FEEDBACK OTHERWISE IF ITS 5 THEN HIGH FEEDBACK
            ####### 1 - VERY LOWW RATING 2 - AVERAGE RATING 3 - OKAYY RATING 4 - GOOD RATING 5 - FANTASTIC RATING
        for review, score, cat, rating in zip(reviews, sentiment_score, sentiment_cat, ratings):
            if grade == "A":
                if int(mark) >= 90 and cat == "positive":
                    if int(mark) >= 95 and score >= 0.95 and score >= 0.9: #high 90%
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_90.append(new_obj)
                        context = Alltop_90
                    elif int(mark) <= 95 and int(mark) >= 90 and score >= 0.9 and score <= 0.95:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_90.append(new_obj)
                        context = Alltop_90
                if int(incorrect) < lower_marks and cat == "negative" and (rating == 5 or rating == 4):
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(mark) >= 80 and int(mark) < 90 and score >= 0.8 and score < 0.9 and cat == "positive":
                    if int(mark) >= 85 and score >= 0.85 and score >= 0.8: #high 80%
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_80.append(new_obj)
                        context = Alltop_80
                    elif int(mark) <= 85 and int(mark) >= 80 and score >= 0.8 and score <= 0.85:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_80.append(new_obj)
                        context = Alltop_80
                if int(mark) >= 70 and int(mark) < 80 and score >= 0.7 and score < 0.8 and cat == "positive":
                    if int(mark) >= 75 and score >= 0.75 and score >= 0.7: #high 70%
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_70.append(new_obj)
                        context = Alltop_70
                    elif int(mark) <= 75 and int(mark) >= 70 and score >= 0.7 and score <= 0.75:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_70.append(new_obj)
                        context = Alltop_70
        # print(improvmentFeedback)
            if grade == "B":
                #students with 60% and higher
                if int(mark) >= 60 and int(mark)  < 70 and score >= 0.6 and score < 0.7 and cat == "positive":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_60.append(new_obj)
                    context = Alltop_60  
                 #negative feedback for improvment
                if int(incorrect) < lower_marks and cat == "negative" and rating == 5:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print(new_obj)
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
            if grade == "C":
                #students with 50% and higher
                if int(mark) >= 50 and int(mark) < 60 and score >= -0.7 and score < -0.5 and cat == "negative":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_50.append(new_obj)
                    context = Alltop_50
                 #negative feedback for improvment
                if int(incorrect) < lower_marks and cat == "negative" and rating == 5:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print(new_obj)
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
            if grade == "D":
                print("entered")
                #students with 45% and higher
                if int(mark) >= 45 and int(mark) < 50 and score >= -0.7 and score < -0.5 and cat == "negative":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_50.append(new_obj)
                    context = Alltop_50
                 #negative feedback for improvment
                if cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
            if grade == "Fail":
                #students with Fail
                if int(mark) >= 0 and int(mark) < 45 and cat == "negative":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    print(new_obj)
                    Alltop_Fail.append(new_obj)
                    context = Alltop_Fail
                #negative feedback for improvment
                if cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
        print(test + " " + mark + " " + correct)
        final_context = [context, improvmentFeedback]
        return JsonResponse(final_context, safe = False)