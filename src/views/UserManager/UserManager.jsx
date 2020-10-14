import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Tag, Button, notification } from 'antd';
import { Layout } from '../../components/index';
import { findAll } from '../../services/person';
import { acceptUser } from '../../services/auth';
import { courses, departments } from '../../helpers';

const UserManager = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        let didCancel = false;
        fetchData(didCancel);
        return () => {
            didCancel = true;
        }
    }, []);

    const fetchData = async (didCancel) => {
        try {
            if (!didCancel) {
                const json = await findAll();
                if (json.Status) {
                    setData(json.people);
                }

            }
        } catch (e) {
            notification.error({
                message: 'Erro',
                description: 'Falha ao carregar dados.'
            });
        }
    }

    const unlockUser = async (userId) => {
        setLoading(true);
        const json = await acceptUser(userId);
        if (json.Status) {
            notification.success({
                message: 'Usuário desbloqueado!',
                description: 'Este usuário já pode acessar a plataforma!'
            });
            fetchData(false);
        } else {
            notification.error({
                message: 'Erro ao liberar acesso',
                description: 'Tente novamente mais tarde.'
            });
        }
        setLoading(false);
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) =>
                <>
                    <span>{`${record.name} ${record.lastName}`}</span>
                    <h5>{record.course ? courses[parseInt(record.course)] : departments[parseInt(record.department)]}</h5>
                </>
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Tags',
            render: (text, record) => (
                <>
                    {(record.isAccepted) ? <Tag color="#108ee9">Ativo</Tag> : <Tag color="#f50">Inativo</Tag>}
                    {(record.course) && <Tag color="geekblue">Aluno</Tag>}
                    {(record.department) && <Tag color="red">Professor</Tag>}
                </>
            ),
        },
        {
            title: '',
            render: (text, record) => (
                record.isAccepted ? null : <Button type="danger" loading={loading} onClick={() => unlockUser(record.personId)}>Desbloquear</Button>
            ),
        },
    ];

    return (
        <Layout currentLocation={props.history.location.pathname}>
            <Row justify="center" gutter={16}>
                <Col xxl={16} xl={18}>
                    <Card>
                        <Table columns={columns} dataSource={data} />
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default UserManager;