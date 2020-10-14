import React from 'react';
import { connect } from 'react-redux';
import { Card, Avatar, Tag, Row, Col, Space, Divider, Skeleton } from 'antd';
import MaleAvatar from '../../images/male_avatar.svg';
import { courses } from '../../helpers/courses';
import { departments } from '../../helpers/departments';

const textOverflowStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '20em'
}

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

const UserCard = (props) => {
    return (
        <Card cover={<Avatar size={144} src={MaleAvatar} style={{ margin: '0 auto', padding: 16 }} />} >
            <Card.Meta
                title={(props.api.loading.person || !props.api.person)
                    ? <Skeleton.Input style={{ width: '20em' }} active size="small" />
                    : <h3 style={{ textAlign: 'center', marginBottom: 0 }}>{`${props.api.person.name} ${props.api.person.lastName}`}</h3>}
                description={
                    <>
                        {
                            (props.api.loading.user || !props.api.user)
                                ? <Skeleton.Input style={{ width: '20em' }} active size="small" />
                                : <h4 style={{ textAlign: 'center', marginBottom: 0 }}>{props.api.user.userType === 1 ? "Professor" : "Aluno"}</h4>
                        }
                        <Space direction="vertical" style={{ width: '100%' }}>

                            <Divider />

                            {
                                (props.api.loading.user || props.api.loading.person || !props.api.user || !props.api.person)
                                    ? <Skeleton />
                                    :
                                    <>
                                        {
                                            props.api.user.userType === 2 &&
                                            <>
                                                <h5>Momento profissional</h5>
                                                {
                                                    props.api.person.isEligible
                                                        ? <p>Estou buscando novas oportunidades de emprego!</p>
                                                        : <p>No momento não estou buscando novas oportunidades de emprego.</p>
                                                }
                                            </>
                                        }

                                        <h5>Tags</h5>

                                        {props.api.user.userType === 1
                                            ?
                                            <>
                                                <Tag color="volcano" style={textOverflowStyle}>{props.api.person.department && departments[parseInt(props.api.person.department)]}</Tag>
                                                {props.api.person.isAdmin && <Tag color="#108ee9">Administrador</Tag>}
                                            </>
                                            :
                                            <>
                                                <Tag color="volcano" style={textOverflowStyle}>{props.api.person.course && courses[parseInt(props.api.person.course)]}</Tag>
                                                {props.api.person.isEligible && <Tag color="#108ee9">Procurando Emprego</Tag>}
                                            </>
                                        }

                                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                            <h5>Contato</h5>
                                            <TextSnippet title="Usuário" description={props.api.user.username} />
                                            <TextSnippet title="Telefone" description={props.api.person.phone} />
                                            <TextSnippet title="Email" description={props.api.person.email} />
                                        </Space>
                                    </>
                            }

                            {
                                (!props.api.address)
                                    ? null
                                    : (!props.api.loading.address) ?
                                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                            <h5>Endereço</h5>
                                            <TextSnippet title="Rua" description={props.api.address.address} />
                                            <TextSnippet title="CEP" description={props.api.address.postalCode} />
                                            <TextSnippet title="Cidade" description={props.api.address.city} />
                                            <TextSnippet title="Estado" description={props.api.address.state} />
                                            <TextSnippet title="País" description={props.api.address.country} />
                                        </Space>
                                        : <Skeleton />
                            }
                        </Space>
                    </>
                }
            />
        </Card>
    );
}

const mapStateToProps = state => ({
    api: state.api
});

export default connect(mapStateToProps)(UserCard);