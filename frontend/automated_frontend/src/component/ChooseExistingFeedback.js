import React from "react";
import { Form, Button, Input,Card, Col, Row,notification, Spin, Typography, Modal, Tooltip  } from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import '../css/Layout.css';
import '../css/reviewFeedback.css';
import { LoadingOutlined } from '@ant-design/icons';
import FeedbackInput from "./GeneralInput.js"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const {Text} = Typography;

class ChooseExistingFeedback extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            showFeedback: false,
            improvement: false,
            effectiveness: "",
            feedbackAmount: 0,
            feedbackAmountState: false,
            collectionFeedback: true,
            value: '',
            improvementFeedback: [],
            AreasOfImprovement: "",
            marks: "",
            topics: "",
            giveImprovement: false,
        }
    }
    onChange = value => {
      this.setState({ value });
    };
    componentDidMount(){
        // const testName = this.props.match.params.testid
        // const testGrade = this.props.match.params.testgrade
        // const testMark = this.props.match.params.testmark
        // const correct = this.props.match.params.correct
        // const incorrect = this.props.match.params.incorrect
        // let test_id = 0
        // let final_effect = ""
        // axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}`)
        // .then(res => {
        //     console.log(res.data)
        //     var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
        //     console.log(random_feedback)
        //     if(random_feedback.category == "negative")
        //     {
        //       this.setState({
        //         improvement: true,
        //       })
        //     }
        //     this.setState({
        //         data: random_feedback,
        //         showFeedback: true
        //     })
            
        // })
        
    }
    generateFeedback(testName, testGrade, testMark, correct){
        console.log("hi yes!!")
        
        this.setState({
            showFeedback: false,
        })
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}`)
        .then(res => {
            console.log(res.data)
            var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
            if(random_feedback.category == "negative")
            {
              this.setState({
                improvement: true,
              })
            }
            this.setState({
                data: random_feedback,
                showFeedback: true
            })
        })
    }
    handleFormSubmit = (e, testName, testGrade, testMark, correct,incorrect, effect) => {
        e.preventDefault();
        this.setState({
          collectionFeedback: true,
        })
        const total = this.state.value;
        let random_data = [];
        let temp_feedback = [];
        let improvement_feedback = [];
        console.log(total);
        let test_id = 0;
        let list_of_marks = []
        let list_of_topics = []
        let weakest = ""
        axios.get(`http://127.0.0.1:8000/api/test`)
        .then(res => {
            res.data.map(function(item, i){
              if(testName == item.name)
              {
                test_id = item.id
              }
            })
            axios.get(`http://127.0.0.1:8000/api/answers`)
            .then(res => {
                res.data.map(function(item, i){
                  if(item.test == test_id)
                  {
                    list_of_topics = item.topics
                    list_of_marks = item.topic_mark_breakdown
                    weakest = item.weakest_topic
                  }
                })
                this.setState({
                  AreasOfImprovement: weakest,
                  topics: list_of_topics,
                  marks: list_of_marks
                })
            })
        })
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}/${incorrect}/${effect}`)
        .then(res => {
            console.log(res.data)
            temp_feedback = res.data[0]
            improvement_feedback = res.data[1]
            var improvement = improvement_feedback[Math.floor(Math.random()*improvement_feedback.length)]
            // var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
            for(let i = 0; i < total; i++)
            {
                var random_feedback = temp_feedback[Math.floor(Math.random()*temp_feedback.length)];
                random_data.push(random_feedback)
            }
            this.setState({
                data: random_data,
                collectionFeedback: false,
                improvementFeedback: improvement,
                giveImprovement: true,
            })
        })
        this.setState({
            feedbackAmountState: true,
            feedbackAmount: total
        })
    }
    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
         if (/\+|-/.test(keyValue))
           event.preventDefault();
      }
    SendFeedback(e)
    {
        console.log(e)
        // let secondsToGo = 10;
        //     const modal = Modal.success({
        //       title: 'Feedback for ' + test + ' has been saved! Go check your saved feedbacks to check them out!!',
        //       content: <Link to={`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.state.data.score + `/` + this.state.data.review + `/` + this.props.match.params.userid}>See full result</Link>,
        //     });
        //     const timer = setInterval(() => {
        //       secondsToGo -= 1;
        //       modal.update({
        //         content: `This message will be destroyed after ${secondsToGo} seconds.`,
        //       });
        //     }, 1000);
        //     setTimeout(() => {
        //       clearInterval(timer);
        //       modal.destroy();
        //     }, secondsToGo * 1000);
        //`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.state.data.score + `/` + this.state.data.review + `/` + this.props.match.params.userid
    }
    render()
    {
      let testName = this.props.match.params.testid
      let testGrade = this.props.match.params.testgrade
      let testMark = this.props.match.params.testmark
      let correct = this.props.match.params.correct
      let incorrect = this.props.match.params.incorrect
      let score = this.props.match.params.score;
      let effect = this.props.match.params.effect;
      let user = this.props.match.params.userid;
      var list_topics = new Array();
      var list_marks = new Array();
      list_topics = this.state.topics.split(",")
      list_marks = this.state.marks.split(",")
        return(
            <div >
                
                {
                this.state.feedbackAmountState ? 
                    
                <Row gutter={10} justify="space-around" type="flex">
                  <Col span={5}>
                    <Card className = "popupreview" bordered style={{color: 'blue'}} title="Test Information" bordered={true}>
                      <Text strong>Test Name:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testid}</Text> <br/>
                      <Text strong>Test Grade:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testgrade}</Text> <br />
                      <Text strong>Test Mark:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testmark} %</Text> <br/>
                      <Text strong>Correct Answers:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.correct}</Text> <br/>
                      <Text strong>Incorrect Answers:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.incorrect}</Text> <br/>
                    </Card>
                  </Col>
                  {/* Improvement feedback */}
                  <Col>
                        <Card  bordered style={{color: 'blue',marginLeft: 100}} title="Improvement Information" bordered={false}>
                          <Text strong>Area (s) of improvement:</Text>{this.state.giveImprovement ? <Text strong style={{color: '#096dd9'}}>{this.state.AreasOfImprovement}</Text> : <Spin indicator={antIcon} />} <br/>
                          <Text strong>Improvement:</Text> {this.state.giveImprovement ? <Text strong style={{color: '#096dd9'}}>{this.state.improvementFeedback.level}</Text> : <Spin indicator={antIcon} />} <br/>
                          <Text strong>Outcome of the generator:</Text> {this.state.giveImprovement ? <Text strong style={{color: '#096dd9'}}>{this.state.improvementFeedback.category}</Text>: <Spin indicator={antIcon} />} <br />
                        </Card> 
                  </Col>
                  <Col>
                      <Card className="popupreview" bordered style={{color: 'blue', textAlign: 'center', fontSize: '18px'}} title="Topic breakdown" bordered={false}>
                      {list_topics.map((i,j) =>{
                        return(
                        <Col span={12}>
                            <Text strong >Title: <Text strong style={{color: '#096dd9'}}>{list_topics[j]}</Text></Text><br/>
                            <Text strong >Mark: <Text strong  style={{color: '#096dd9'}}>{list_marks[j]}</Text></Text>
                         </Col>
                        )
                      })}  
                      </Card>
                  </Col>
                  {
                    this.state.collectionFeedback ?
                   <Text strong style={{color: 'skyblue', fontSize: '19px'}}>Please wait while {this.state.feedbackAmount} feedbacks are being generated!<br/><Spin indicator={antIcon} /></Text>
                    :
                    <div style={{textAlign: 'center'}}>
                      {this.state.data.map(function(item, i){
                        let title = "Feedback " + (i+1)
                        let review = item.review
                       function SendFeedback(review)
                        {
                          //<Button onClick={(e) => this.SendFeedback("ggg")}>HEY</Button>
                          
                            console.log(review)
                            let secondsToGo = 20;
                                const modal = Modal.success({
                                  title: 'Thank you for choosing a feedback! You can now choose to save or export!',
                                  content: '',
                                });
                                const timer = setInterval(() => {
                                  secondsToGo -= 1;
                                  modal.update({
                                    content: `This message will be destroyed after ${secondsToGo} seconds` ,
                                  });
                                }, 1000);
                                setTimeout(() => {
                                  clearInterval(timer);
                                  modal.destroy();
                                }, secondsToGo * 1000);
                            //`/generatefeedback/` + testName + `/` + testMark +`/` + testGrade + `/` + correct + `/` + incorrect +`/` + score + `/` + review + `/` + userid
                        }
                        let score = Math.round(item.score * 100)
                        
                        return(
                          <Col span={5} style={{textAlign: 'center'}}>
                            <Card bordered style={{ color: 'blue'}} title={title} bordered={false}>
                                <Text strong style={{color: '#096dd9'}}>Review: </Text><Text strong>{item.review}</Text><br />
                                <Text strong style={{color: '#096dd9'}}>Score: </Text><Text strong>{score}</Text><br />
                                <Text strong style={{color: '#096dd9'}}>Outcome of test: </Text><Text strong>{item.effectiveness}</Text>
                            </Card>
                            
                            <Link to={`/generatefeedback/` + testName + `/` + testMark +`/` + testGrade + `/` + correct + `/` + incorrect +`/` + score + `/` + review + `/` + user}><Button onClick={(e) => SendFeedback(review)} style={{margin: '5px'}} type="primary">Choose Feedback</Button></Link>
              
                          </Col>
                        )
                      })}
                      
                    </div>
                  }
                </Row>
                 : 
                 <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.match.params.testid, this.props.match.params.testgrade, this.props.match.params.testmark, this.props.match.params.correct, this.props.match.params.incorrect, this.props.match.params.effect)}>
                    <Form.Item style={{textAlign: 'center'}} label="How many feedbacks would you like to see? (maximum 5)">
                        <FeedbackInput name="amount" style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}} >
                        <Button type="primary" htmlType="submit">Generate Feedbacks</Button>
                    </Form.Item>
                 </Form>
            
                }
            </div>
        )
    }
}
export default ChooseExistingFeedback