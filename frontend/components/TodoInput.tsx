import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface TodoInputProps {
    todoInput: string
    onChangeText: (value: string) => void
    postTodo: (todoInput: string, date: Date | null) => void
    isDeadline: boolean
    setDeadline: () => void
    deleteDeadline: () => void
    showPleaseInputTodo: boolean
    showCharacterLimit: boolean
}

interface TodoInputState {
    showTimeComponent: boolean
    date: Date | null
}

const currentTime = new Date()

const Wrapper = styled.div`
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
`

const Warning = styled.div``

const TodoInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #EEEEEE;
    padding: 5px;
    width: 300px;
    margin: auto;
`

const TimeIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-top: 2px;
    margin-left: 10px;
`

const TextInput = styled.input`
    width: 200px;
    font-size: 15px;
    margin-left: 10px;
    outline: 0;
    font-family: 'Vollkorn', serif;
`

const AddButton = styled.div`
    margin-left: 10px;
    margin-right: 7px;
    background-color: #003399;
    color: white;
    padding: 3px;
` 

const DatePickerWrapper = styled.div`
    margin-top: 5px;
    position: absolute;
`

const UpdateOrDeleteDeadlineWrapper = styled.div`
    margin-top: 5px;
    margin-right: 100px;
    position: absolute;
    background-color: white;
    width: 300px;
    text-align: center;
    box-shadow:0px 0px 3px 0.5px #C0C0C0;
    @media (max-width: 768px) {
        width: 200px;
        margin-right: 50px;
    }
`

const UpdateDeadline = styled.div`
    border-bottom: solid 1px #EEEEEE;
`

const DeleteDeadline = styled.div``

export class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
    constructor(props: TodoInputProps) {
        super(props)
        this.state = {
            showTimeComponent: false,
            date: currentTime
        }
    }
    
    render(){
        const { todoInput, onChangeText, postTodo, isDeadline, setDeadline, deleteDeadline, showPleaseInputTodo, showCharacterLimit } = this.props
        const { showTimeComponent, date } = this.state

        const onClickTimeIcon = (showTimeComponent: boolean) => {
            this.setState({ showTimeComponent: !showTimeComponent })
        }
    
        const handleChangeOfDate = (date: Date | null) => {
            this.setState({ date })
            this.setState({ showTimeComponent: false })        
        }

        return (
            <Wrapper>
                { showPleaseInputTodo ? 
                    <Warning>Todoを入力して下さい</Warning>
                : <div />
                }
                { showCharacterLimit ?
                    <Warning>15文字以上入力できません</Warning>
                : <div />
                }
                <TodoInputWrapper>
                    <TimeIcon 
                        src={require('../public/images/time.png')} 
                        alt='time'   
                        onClick={() => onClickTimeIcon(showTimeComponent)}  
                    />
                    <TextInput 
                        type="text"
                        placeholder='ToDoを入力して下さい'
                        value={todoInput}
                        onChange={e => onChangeText(e.target.value)}
                    />
                    <AddButton 
                        onClick={() => {
                            postTodo(todoInput, date)
                            this.setState({ date: currentTime })
                            this.setState({ showTimeComponent: false })
                        }}
                    >
                        Add
                    </AddButton>
                </TodoInputWrapper>

                { showTimeComponent && !isDeadline ?
                <DatePickerWrapper>
                    <DatePicker
                        selected={date}
                        onChange={(date) => {
                            handleChangeOfDate(date)
                            setDeadline()
                        }}
                        inline
                    />
                </DatePickerWrapper>
                : <div />
                }

                { showTimeComponent && isDeadline ?
                <UpdateOrDeleteDeadlineWrapper>
                    <UpdateDeadline 
                        onClick={() => {
                            this.setState({ showTimeComponent: true })
                            deleteDeadline()
                            this.setState({ date: currentTime })
                        }}
                    >
                        変更する
                    </UpdateDeadline>
                    <DeleteDeadline
                        onClick={() => {
                            this.setState({ showTimeComponent: false })             
                            deleteDeadline()
                            this.setState({ date: currentTime })
                        }}
                    >
                        削除する
                    </DeleteDeadline>
                </UpdateOrDeleteDeadlineWrapper>

            : <div />
            }
            </Wrapper>
        )
    }
}