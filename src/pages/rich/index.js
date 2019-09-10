import React, {Component} from 'react'
import {Card, Button, Modal} from 'antd'

// 使用富文本编辑器
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// 使用draftjs将富文本obj转换为html
import draftjs from 'draftjs-to-html'

export default class Rich extends Component {

    state = {
        editorState: null,
        showRichText: false,
        contentState: null
    };

    // 获取写入的内容
    onEditorStateChange = (editorState) => {
        this.setState({editorState})
    };

    // 请求写入的内容和内容对象
    handleClearContent = () => {
        this.setState({editorState: null, contentState: null})
    };

    handleGetText = () => {
        this.setState({showRichText: true})
    };

    // 获取写入的内容的对象
    onEditorChange = (contentState) => {
        this.setState({contentState})
    };

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本内容"
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({showRichText: false})
                    }}
                    footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}