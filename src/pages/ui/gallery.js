import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: null,
            visible: false,
        };
    }

    handleClickOpen = imgSrc => {
        this.setState({ visible: true, currentImg: `/gallery/${imgSrc}` });
    };

    render() {
        const imgs = [
            ['timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg'],
            ['timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg'],
            ['timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg'],
            ['timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg'],
            ['timg.jpg', 'timg.jpg', 'timg.jpg', 'timg.jpg', 'stimg.jpg'],
        ];
        const imgList = imgs.map(list =>
            list.map((item, index) => (
                <Card
                    style={{ marginBottom: 10 }}
                    cover={
                        <img
                            src={`/gallery/${item}`}
                            alt={item}
                            onClick={() => this.handleClickOpen(item)}
                        />
                    }
                    key={item}
                >
                    <Card.Meta title="React Card Gallery" description="I Like use React" />
                </Card>
            )),
        );
        const { visible, currentImg } = this.state;
        return (
            <div>
                <Row gutter={10}>
                    <Col md={5}>{imgList[0]}</Col>
                    <Col md={5}>{imgList[1]}</Col>
                    <Col md={5}>{imgList[2]}</Col>
                    <Col md={5}>{imgList[3]}</Col>
                    <Col md={4}>{imgList[4]}</Col>
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={visible}
                    title="图片画廊"
                    onCancel={() => {
                        this.setState({ visible: false, currentImg: null });
                    }}
                    footer={null}
                >
                    <img src={currentImg} alt="" style={{ width: '100%' }} />
                </Modal>
            </div>
        );
    }
}
