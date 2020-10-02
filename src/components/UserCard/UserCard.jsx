import React from 'react';
import { Card, Avatar, Tag, Row, Col, Space, Divider } from 'antd';
import MaleAvatar from '../../images/male_avatar.svg';

const TextSnippet = (props) => {
    const titleStyle = {
        fontWeight: 600,
        textAlign: 'start'
    };

    const descriptionStyle = {
        textAlign: 'end'
    };
    return (
        <Row justify="space-between">
            <Col style={titleStyle}>{props.title}</Col>
            <Col style={descriptionStyle}>{props.description}</Col>
        </Row>
    );
}

const UserCard = () => {
    return (
        <Card
            //style={{ width: 300 }}
            cover={<Avatar size={144} src={MaleAvatar} style={{ margin: '0 auto', padding: 16 }} />}
        >
            <Card.Meta
                title={<h3 style={{ textAlign: 'center', marginBottom: 0 }}>Fulano de tal</h3>}
                description={
                    <>
                        <h4 style={{ textAlign: 'center', marginBottom: 0 }}>Estudante/Professor</h4>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Divider />

                            <h5>Perfil</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta sapiente earum, necessitatibus commodi eius pariatur repudiandae cum sunt officiis ex!</p>

                            <h5>Tags</h5>
                            <p>
                                <Tag>tag1</Tag>
                                <Tag>tag2</Tag>
                                <Tag>tag3</Tag>
                            </p>

                            <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                <h5>Contato</h5>
                                <TextSnippet title="Telefone" description="(12) 1234-1234" />
                                <TextSnippet title="Celular" description="(12) 91234-1234" />
                                <TextSnippet title="Email" description="formeieagora@gmail.com" />
                            </Space>

                            <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                <h5>Endereço</h5>
                                <TextSnippet title="Rua" description="Rua Simão Mauad" />
                                <TextSnippet title="Cidade" description="Itajubá" />
                                <TextSnippet title="Estado" description="Minas Gerais" />
                                <TextSnippet title="CEP" description="37500-200" />
                            </Space>
                        </Space>
                    </>
                }
            />
        </Card>
    );
}

export default UserCard;