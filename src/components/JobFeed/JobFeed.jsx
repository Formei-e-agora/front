import React from 'react';
import { List, Card } from 'antd';
import { LikeOutlined, CommentOutlined, SendOutlined, ShareAltOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Professor Fulano postou nova vaga',
    },
    {
        title: 'Aluno X entrou na plataforma',
    },
    {
        title: 'Nova vaga postada!',
    },
    {
        title: 'Professor XX postou uma nova vaga',
    },
];

const JobFeed = () => {
    return (
        <List
            grid={{ column: 1 }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Card
                        title={item.title}
                        actions={[
                            <span><LikeOutlined style={{ marginRight: 8 }} />Gostei</span>,
                            <span><CommentOutlined style={{ marginRight: 8 }} />Comentar</span>,
                            <span><SendOutlined style={{ marginRight: 8 }} />Compartilhar</span>,
                            <span><ShareAltOutlined style={{ marginRight: 8 }} />Enviar</span>
                        ]}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse rhoncus diam id interdum blandit.
                        Vivamus in nulla vel lacus volutpat ullamcorper.
                        Nam eget magna eu arcu rutrum eleifend vitae non ante. Mauris semper a velit ac dapibus.
                        Integer sit amet ante purus. Proin dui mauris, commodo id erat sed, commodo varius felis.
                        Vivamus vestibulum ac leo nec semper. Nam porttitor a velit vel vehicula.
                        Morbi dictum magna finibus mi porta vestibulum. Mauris id tortor risus. Fusce malesuada ut elit sit amet posuere.
                        Mauris vitae quam vehicula, vehicula libero ac, interdum ligula. Praesent vestibulum erat eu felis dictum euismod. Sed in congue urna.
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default JobFeed;