import React from "react"
import {Table, Divider, Button, Input, Modal, Form, Select} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
const TableContext = React.createContext(false);
const {Option} = Select;
class SavedTests extends React.Component {
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
            delay: 450,
            ease: 'easeOutQuad',
            onComplete: this.onEnd,
          },
          {
            opacity: 1, x: 0, duration: 450, ease: 'easeOutQuad',
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
                    leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
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
            type: 'default',
            size: 'large',
            test: [],
            module: [],
            savedtests: [],
            grades: [],
            showingAlerts: false,
            searchText: '',
            searchedColumn: '',
            showPopup: false,
            showPopupGrade: false,
            testName: "",
            moduleName: "",
            test_id: 0,
            tableData: [],
        }
    }
    onEnd = (e) => {
      const dom = e.target;
      dom.style.height = 'auto';
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
    handleModuleSubmit(e, requestMethod, test, mod)
    {
      e.preventDefault();
      const title = e.target.elements.name.value;
      const description = e.target.elements.description.value;
      const num_questions = e.target.elements.num.value;
      const num_sub = e.target.elements.sub.value;
      const type = this.state.type;
      
      console.log(title, num_questions, description, type, num_sub);
      let TESTID = 0;
      let MODULEID
      axios.get(`http://127.0.0.1:8000/api/test`)
      .then(res => {
        res.data.map(function(item, i){
          if(item.name == test)
          {
            TESTID = item.id
            MODULEID = item.module
          }
        })
        switch(requestMethod) {
          case 'put':
              axios.put(`http://127.0.0.1:8000/api/test/${TESTID}/update/`, {
                name: title,
                test_count: num_questions,
                num_subquestions: num_sub,
                description: description,
                created_date: new Date().toLocaleString(),
                questiontype: type,
                module: MODULEID,
              })
              .then(res => {
                console.log(res)
                  this.setState({
                    showingAlert: true
                });
                setTimeout(() => {
                    this.setState({
                      showingAlert: false,
                    });
                }, 5000);
              })
              .catch(err => console.log(err))
          default:
            return null
        }
      })
    }
    handleGradeSubmit(e, requestMethod, test, moduleName){
      e.preventDefault();
      let grade = " ";
      let effectiveness = "";
      const total = e.target.elements.total_mark.value;
      const total_sub = e.target.elements.total_sub.value;
      const weakest = e.target.elements.weakest.value;
      const final_mark = parseInt((total_sub/total)*100)
      if(final_mark >= 70 && final_mark <= 100)
      {
        grade = "A";
        effectiveness = "Outstanding";
      }
      else if(final_mark >= 60 && final_mark <= 69)
      {
        grade = "B";
        effectiveness = "Good";
      }
      else if(final_mark >= 50 && final_mark <= 59)
      {
        grade = "C";
        effectiveness = "Need Improvement";
      }
      else if(final_mark >= 45 && final_mark <= 49)
      {
        grade = "D";
        effectiveness = "Poor";
      }
      else
      {
        grade = "Fail";
        effectiveness = "Fail";
      }
      console.log(test + " " + total + " " + total_sub + " " + final_mark)
      let TESTID = 0;
      let GRADEID = 0;
      axios.get(`http://127.0.0.1:8000/api/test`)
      .then(res => {
          res.data.map(function(item, i){
            if(item.name == test)
            {
              TESTID = item.id
            }
          })
          console.log(TESTID)
          
          axios.get(`http://127.0.0.1:8000/api/grades`)
          .then(res => {
            res.data.map(function(item, i){
              if(item.test = TESTID)
              {
                GRADEID = item.id
              }
            })
            console.log(GRADEID)
            switch(requestMethod) {
              case 'put':
                axios.put(`http://127.0.0.1:8000/api/grade/${GRADEID}/update/`, {
                  grade: grade,
                  grade_mark: final_mark,
                  effectiveness: effectiveness,
                  test: TESTID
                })
                .then(res => {
                  console.log(res) 
                  axios.post('http://127.0.0.1:8000/api/create/answer/', {
                    test: TESTID,
                    total_mark_for_question: total,
                    total_sub_marks: total_sub,
                    weakest_topic: weakest
                  })
                    .then(res => {
                      console.log(res)
                    })
                    this.setState({
                        showingAlert: true
                    });
                    setTimeout(() => {
                        this.setState({
                          showingAlert: false,
                        });
                    }, 5000);
                })
                .catch(err => console.log(err))
              case 'post':
                  return null
            }
          })
          
      })
      
    }
    onKeyPress(event) {
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);
       if (/\+|-/.test(keyValue))
         event.preventDefault();
    } 
    toggle = (test, mod) =>{

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
          <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
                <strong>Your test has been updated!</strong>
          </div>
          <h2 style={{display: 'flex', justifyContent: 'center'}} >Update {test} Information here!</h2>
          <Form onSubmit={(event) => this.handleModuleSubmit(event, "put", test, mod)}>
              <Form.Item label="Name">
                <Input name="name" placeholder="Name of exam..." />
              </Form.Item>
              <Form.Item label="Number of questions">
                <Input type="number" name="num" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="Number of sub questions">
                <Input type="number" name="sub" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="Description">
                <Input name="description" name="description" placeholder="e.g. mid term or revision..." />
              </Form.Item>
              <Form.Item label="Type of question">
                  <Select ref={ref => {
                    this._select = ref }} labelInValue defaultValue={this.state.value} style={{width: 190}} onChange={this.handleChange}>
                      <Option value="MCQ">Multiple choice questions</Option>
                      <Option value="Definition">Short definitions</Option>
                      <Option value="Skeleton Program">Skeleton program questions</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Update Test Information</Button>
              </Form.Item>
        </Form>
      </div> ,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    }
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/modules'),
            axios.get('http://127.0.0.1:8000/api/savedtests'),
            axios.get('http://127.0.0.1:8000/api/grades')
        ])
        .then(axios.spread((questionres, moduleres, savedtestsres, grades) => {
                this.setState({
                    test: questionres.data,
                    module: moduleres.data,
                    savedtests: savedtestsres.data,
                    grades: grades.data
                })
                console.log(this.state.test)
                console.log(this.state.module)
                console.log(this.state.savedtests)
                console.log(this.state.grades)
        }))
    }
    toggleGrade = (test, mod) =>{
      let secondsToGo = 600;
      
      const modal = Modal.success({
        title: `This message will be destroyed after 10 minutes` ,
        content: '',
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: 
          <div style={{color: 'red'}}> 
          <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
               <strong>The grade Information has been saved! </strong> Go check your saved tests!!
          </div> 
          <div >  
          <h2 style={{display: 'flex', justifyContent: 'center'}} >Update grade Information {test} here!</h2>
            <Form onSubmit={(event) => this.handleGradeSubmit(event, "put", test)}>
              <Form.Item label="Total mark for all questions">
                <Input type="number" name="total_mark" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="Total mark given to students for sub questions">
                  <Input type="number" name="total_sub" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="What was the students weakest topic?">
                  <Input name="weakest" placeholder="" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Update Grade</Button>
            </Form.Item>
          </Form>
          </div>  
      </div> ,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
      
    }
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/modules'),
            axios.get('http://127.0.0.1:8000/api/savedtests'),
            axios.get('http://127.0.0.1:8000/api/grades')
        ])
        .then(axios.spread((questionres, moduleres, savedtestsres, grades) => {
                this.setState({
                    test: questionres.data,
                    module: moduleres.data,
                    savedtests: savedtestsres.data,
                    grades: grades.data
                })
                console.log(this.state.test)
                console.log(this.state.module)
                console.log(this.state.savedtests)
                console.log(this.state.grades)
        }))
    }
    handleDelete (key, test, e) {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data, isPageTween: false });
        console.log(e)
        let TESTID = 0
        let found = false
        let temp_test = {}
        this.state.test.map(function(item, i){
            if(item.name == test)
            {
                found = true
                TESTID = item.id
                axios.delete(`http://127.0.0.1:8000/api/test/${TESTID}/delete`);
            }
        }) 
        if(found)
        {
          this.setState({
            deletedTable: true,
          })
          let secondsToGo = 10;
          const modal = Modal.success({
            title: 'Test for ' + e + ' has been deleted',
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
          this.forceUpdate();
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
    render(){
        const {id} = this.props.match.params
        const {data} = this.state
        console.log(id)
        let test_id = []
        let testInfo = {}
        let savedtests = []
        let testNames = []
        let modulei_ids = []
        let temp_modules = this.state.module
        let savedGrades = []
        const temptest = []
        let temp_grades = this.state.grades
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
                            if(item.module == modid.id){
                                console.log(item.name + " " + gradeid.grade)
                                temp_test = {
                                    key: index,
                                    name: modid.title,
                                    test: item.name,
                                    grade: gradeid.grade,
                                    mark: gradeid.grade_mark
                                }
                                temptest.push(temp_test)
                                testInfo = temp_test
                            }
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
            ...this.getColumnSearchProps('test')
          }, {
            title: 'Grade given',
            dataIndex: 'grade',
            ...this.getColumnSearchProps('grade'),
            render: (text) => {
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Grade Mark',
            dataIndex: 'mark',
            key: 'test',
            ...this.getColumnSearchProps('mark')
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <Link to={`/feedbackInfo/` + record.test + `/` + this.props.match.params.id}>Generate feedback</Link>
                <Divider type="vertical" />
                <Button onClick={(e) => this.toggle(record.test, record.name)} type="primary" htmlType="submit">Update Test</Button>
                <Divider type="vertical" />
                <Button onClick={(e) => this.handleDelete(record.key, record.test, e)} type="danger" htmlType="submit">Delete Test</Button>
              </span>
            ),
          }];
        this.columns = columns
        return(
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome back {this.props.match.params.id.toUpperCase()} heres a summary of your saved tests!</h1>
                <div className={`${this.props.className}-wrapper`}>
                <div className={this.props.className}>
                  <div className={`${this.props.className}-table-wrapper`}>
                  <TableContext.Provider value={this.state.isPageTween}>
                    <Table
                      columns={this.columns}
                      dataSource={this.state.data}
                      pagination ={{
                        total: this.state.data.length,
                        pageSize: this.state.data.length,
                        hideOnSinglePage: true
                      }}
                      className={`${this.props.className}-table`}
                      components={{ body: { wrapper: this.animTag } }}
                      onChange={this.pageChange}
                    />
                  </TableContext.Provider>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
export default SavedTests