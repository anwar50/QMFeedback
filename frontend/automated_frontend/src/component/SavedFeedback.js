import React from "react"
import {Table, Divider, Button, Input, Modal, Collapse, Card, Col, Row,notification} from 'antd';
import axios from "axios";
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import '../css/Layout.css';
import { TweenOneGroup } from 'rc-tween-one';
const TableContext = React.createContext(false);
const { Panel } = Collapse;
class SavedFeedback extends React.Component {
    static propTypes = {
      className: PropTypes.string,
    };

    static defaultProps = {
      className: 'table-enter-leave-demo',
    };
    constructor(props)
    {
        super(props);
        this.columns = [];
        this.newdata = [];
        this.data = [];
        this.enterAnim = [
          {
            opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
          },
          {
            height: 0,
            duration: 200,
            type: 'from',
            delay: 250,
            ease: 'easeOutQuad',
            onComplete: this.onEnd,
          },
          {
            opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
          },
          { delay: 1000, backgroundColor: '#fff' },
        ];
        this.pageEnterAnim = [
          {
            opacity: 0, duration: 0,
          },
          {
            height: 0,
            duration: 150,
            type: 'from',
            delay: 150,
            ease: 'easeOutQuad',
            onComplete: this.onEnd,
          },
          {
            opacity: 1, duration: 150, ease: 'easeOutQuad',
          },
        ];
        this.leaveAnim = [
          { duration: 250, opacity: 0 },
          { height: 0, duration: 200, ease: 'easeOutQuad' },
        ];
        this.pageLeaveAnim = [
          { duration: 150, opacity: 0 },
          { height: 0, duration: 150, ease: 'easeOutQuad' },
        ];
        
        this.animTag = ($props) => {
          return (
            <TableContext.Consumer>
              {(isPageTween) => {
                return (
                  <TweenOneGroup
                    component="tbody"
                    enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                    //leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                    appear={false}
                    exclusive
                    {...$props}
                  />
                );
              }}
            </TableContext.Consumer>
          );
        };
        this.state = {
          data: this.data,
            isPageTween: false,
            size: 'large',
            test: [],
            module: [],
            savedtests: [],
            savedfeedback: [],
            grades: [],
            showingAlert: false,
            searchText: '',
            searchedColumn: '',
            improvement: '',
            area: '',
            improvementClicked: false,
            answers: []
        }
    }
    onEnd = (e) => {
      const dom = e.target;
    }
    onDelete = (key, e) => {
      e.preventDefault();
      const data = this.state.data.filter(item => item.key !== key);
      this.setState({ data, isPageTween: false });
    }
  
    pageChange = () => {
      this.setState({
        isPageTween: true,
      });
    };
    handleChange = (e) => {
      const val = e.label
      console.log(val)
      this.setState({
        type: e.label
      })
    }
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/modules'),
            axios.get('http://127.0.0.1:8000/api/savedtests'),
            axios.get('http://127.0.0.1:8000/api/grades'),
            axios.get('http://127.0.0.1:8000/api/savedfeedbacks'),
            axios.get('http://127.0.0.1:8000/api/answers'),
        ])
        .then(axios.spread((questionres, moduleres, savedtestsres, grades, savedfeedbackres, answers) => {
                this.setState({
                    test: questionres.data,
                    module: moduleres.data,
                    savedtests: savedtestsres.data,
                    grades: grades.data,
                    savedfeedback: savedfeedbackres.data,
                    answers: answers.data
                })
                console.log(this.state.test)
                console.log(this.state.module)
                console.log(this.state.savedtests)
                console.log(this.state.grades)
                console.log(this.state.savedfeedback)
        }))
    }
    handleImprovement (key, feedback, testid, e){
        e.preventDefault();
        const data = this.state.data.filter(item => (item.key == key) || (item.key != key));
        this.setState({ data, isPageTween: true  });
        console.log(testid)
        axios.get(`http://127.0.0.1:8000/api/savedimprovements`)
        .then(res =>{
          let found = false
          let temp_area = ""
          let temp_improvement = ""
          res.data.map(function(item, i){
            if(testid == item.test)
            {
              found = true
              temp_area = item.area_of_improvement
              temp_improvement = item.improvement_feedback
            }
          })
          if(found)
          {
            this.setState({
                area: temp_area,
                improvement: temp_improvement,
                improvementClicked: true
              })
          }
        })
    }
    handleDelete (key, test, e) {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data, isPageTween: false });
        console.log(e)
        let FEEDBACKID = 0
        let found = false
        this.state.savedfeedback.map(function(item, i){
            if(item.feedback == test)
            {
                found = true
                FEEDBACKID = item.id
                console.log(FEEDBACKID)
                axios.delete(`http://127.0.0.1:8000/api/savedfeedback/${FEEDBACKID}/delete`)
            }
        }) 
        if(found)
        {
            let secondsToGo = 10;
            const modal = Modal.success({
              title: 'The feedback  ' + e + ' has been deleted! ',
              content: ``,
            });
            const timer = setInterval(() => {
              secondsToGo -= 1;
              modal.update({
                content: `This message will be destroyed after ${secondsToGo} seconds.`,
              });
            }, 1000);
            setTimeout(() => {
              clearInterval(timer);
              modal.destroy();
            }, secondsToGo * 1000);
        }
        else
        {

        }
    }
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    handleClick(){
      this.setState({
        improvementClicked: false
      })
    }
    gradePopup(testid){
      console.log(testid)
      const openNotification = () => {
        let total = correct + incorrect;
        notification.open({
          message: correct + ' out of ' + total, 
           onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };
      let test_id = 0
      let test_grade = 0
      let test_mark = 0
      let effect = ""
      let correct = 0
      let total = 0
      let incorrect = 0
      let sub_questions = 0
      let testName = ""
      let Tests = this.state.test
      let Grades = this.state.grades
      let Answers = this.state.answers
        //first get the id of the test based on the test name given
      Tests.map(function(item, i){
        if(item.id == testid)
        {
            test_id = item.id
            testName = item.name
            sub_questions = item.num_subquestions
        }
      })
      Grades.map(function(item, i){
          if(item.test == test_id)
          {
              test_grade = item.grade
              test_mark = item.grade_mark
              effect = item.effectiveness
          }
      })
      Answers.map(function(item, i){
        if(item.test == test_id)
        {
          total = item.total_mark_for_question
          correct = item.total_sub_marks
          incorrect = item.total_mark_for_question - item.total_sub_marks
        }
      })
      let secondsToGo = 600;
      
      const modal = Modal.success({
        title: `This message will be destroyed after 10 minutes` ,
        content: '',
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: 
      <div>
          <h2 style={{display: 'flex', justifyContent: 'center'}} >Here is a test breakdown</h2>
          <Row gutter={50}>
            <Col span={50}>
                <Card bordered style={{color: 'blue'}} title="Test Name" bordered={false}>
                    {testName}
                </Card>
            </Col>
            <Col span={50}>
                <Card bordered style={{color: 'blue'}} title="Grade given" bordered={false}>
                      {test_grade}
                </Card>
            </Col>
            <Col span={50}>
                <Card bordered style={{color: 'blue'}} title="Total sub questions" bordered={false}>
                      {sub_questions}
                </Card>
            </Col>
            <Col span={50}>
                <Card  bordered style={{color: 'blue'}} title="Percentage Mark" bordered={false}>
                      {test_mark}
                </Card>
            </Col>
            <Col span={50}>
                <Card  bordered style={{color: 'blue'}} title="Correct answers" bordered={false}>
                      {correct}
                </Card>
            </Col>
            <Col span={50}>
                <Card bordered style={{color: 'blue'}} title="Incorrect answers" bordered={false}>
                      {incorrect}
                </Card>
            </Col> <br />
            
                <Button type="primary" onClick={openNotification}>
                        Open the see overall mark
                </Button>
            
          </Row>
      </div> ,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    }
    render(){
        function callback(key) {
          console.log(key);
        }
        const {id} = this.props.match.params
        console.log(id)
        let test_id = []
        let testInfo = {}
        let savedtests = []
        let testNames = []
        let modulei_ids = []
        let testID = 0
        let temp_modules = this.state.module
        let savedGrades = []
        const temptest = []
        let temp_grades = this.state.grades
        let temp_feedbacks = this.state.savedfeedback
        this.state.savedtests.map(function(item, i){
                //check the username against the given username
            if(item.username === id)
            {
                savedtests.push(item.test)
                test_id.push(item.module)
            }
        })
        this.state.test.map(function(item, i){
            savedtests.map(function(testID, i){
                if(item.id == testID)
                {
                    testNames.push(item.name);
                   
                    modulei_ids.push(item.module)
                }
            })
        })
        this.state.test.map(function(item, index){
            let temp_test = {}
            temp_grades.map(function(gradeid, i){
                savedtests.map(function(savedtestid, i){
                    if(item.id == savedtestid && gradeid.test == savedtestid)
                    {
                        temp_modules.map(function(modid, i){
                            temp_feedbacks.map(function(feedbackid, i){
                                if(item.module == modid.id && item.id == feedbackid.test){
                                  testID = item.id
                                    console.log(item.name + " " + gradeid.grade)
                                    temp_test = {
                                        key: index,
                                        name: modid.title,
                                        test: item.name,
                                        grade: gradeid.grade,
                                        feedback: feedbackid.feedback,
                                        accuracy: feedbackid.percentage,
                                        creation: feedbackid.created_by
                                    }
                                    temptest.push(temp_test)
                                    testInfo = temp_test
                                }
                            })  
                        })
                    }
                })
            })
        })
        this.state.test.map(function(item, i){
            savedtests.map(function(testID, i){
                if(item.id == testID)
                {
                    testNames.push(item.name);
                    modulei_ids.push(item.module)
                }
            })
            
        })
        console.log(testInfo)
        for(var i = 0; i < temptest.length; i++)
        {
          this.data.push(temptest[i]);
        }
        const columns = [{
            title: 'Module Name',
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name'),
            render: (text) => {
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Test Name',
            dataIndex: 'test',
            key: 'test',
            ...this.getColumnSearchProps('test'),
            
          }, {
            title: 'Grade given',
            dataIndex: 'grade',
            ...this.getColumnSearchProps('grade'),
            render: (text) => {
                if(text == "None")
                {
                    
                }
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Saved feedback',
            dataIndex: 'feedback',
            key: 'feedback',
            ...this.getColumnSearchProps('feedback')
          }, {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            key: 'accuracy',
            ...this.getColumnSearchProps('accuracy')
          }, {
            title: 'Created By',
            dataIndex: 'creation',
            key: 'accuracy',
            ...this.getColumnSearchProps('creation')
          },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <Button onClick={(e) => this.handleImprovement(record.key, record.feedback, testID, e)} type="primary" htmlType="submit">See Improvement</Button>
                <Divider type="horizontal" />
                <Button onClick={(e) => this.handleDelete(record.key, record.feedback, e)} type="danger" htmlType="submit">Delete Feedback</Button>
              </span>
            ),
          },{
            title: 'Grade information',
            key: 'update',
            render: (text, record) => (
              <span>
                
                <Button onClick={(e) => this.gradePopup(testID)} type="primary" htmlType="submit">See grade</Button>
              </span>
            ),
          }];
          this.columns = columns
        return(
            
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome back {this.props.match.params.id.toUpperCase()} heres a collection of your saved feedbacks!</h1>
              <div className={`${this.props.className}-wrapper`}>
                <div className={this.props.className}>
                  <div className={`${this.props.className}-table-wrapper`}>
                  <TableContext.Provider value={this.state.isPageTween}>
                    <Table
                      columns={this.columns}
                      pagination={{ pageSize: 4 }}
                      dataSource={this.state.data}
                      className={`${this.props.className}-table`}
                      components={{ body: { wrapper: this.animTag } }}
                      onChange={this.pageChange}
                    />
                  </TableContext.Provider>
                  </div>
                </div>
              </div>
              {
                this.state.improvementClicked ?
                <div>
                  <Collapse defaultActiveKey = {['1']} onChange={callback}>
                    <Panel header="Improvement feedback" key="2">
                      <p>{this.state.improvement}</p>
                    </Panel>
                    <Panel header="Area of improvement" key="3">
                      <p>{this.state.area}</p>
                    </Panel>
                  </Collapse><br/>
                  <div style={{marginLeft: '40%', marginRight: '50%'}}>
                    <Button onClick={(e) => this.handleClick()} type="primary">Close feedback</Button>
                  </div>
                </div>
                :
                null
              }
              
            </div>
        )
    }
}
export default SavedFeedback