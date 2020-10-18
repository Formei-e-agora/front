import React, { useState, useEffect } from 'react';
import { Row, Col, Button, notification, List } from 'antd';
import { TagOutlined, BankOutlined, ScheduleOutlined, TrophyOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { createCourseReq, deleteCourseReq } from '../../services/course';
import { courses } from '../../helpers';

const CourseRequirementsForm = (props) => {

    const [loading, setLoading] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    return (
        <List
            itemLayout="horizontal"
            dataSource={courses}
            pagination={{ pageSize: 10 }}
            renderItem={item => (
                <List.Item extra={[<Button type="primary">Adicionar</Button>, <Button type="danger">Remover</Button>]}>
                    <List.Item.Meta title={item} />
                </List.Item>
            )}
        />
    );
}

export default CourseRequirementsForm;