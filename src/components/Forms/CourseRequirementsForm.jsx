import React, { useState, useEffect } from 'react';
import { Button, message, List } from 'antd';
import { createCourseReq, deleteCourseReq } from '../../services/course';
import { findJob } from '../../services/job';
import { courses } from '../../helpers';

const CourseRequirementsForm = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        let didCancel = false;
        fetchJobData(props.jobId, didCancel);
        return () => {
            didCancel = true;
        }
    }, []);

    const fetchJobData = async (id, didCancel) => {
        try {
            if (!didCancel) {
                const json = await findJob(id);
                if (json.Status)
                    setData(json.jobData)
            }
        } catch (e) {
            message.error("Falha em atualizar lista de cursos");
        }
    }

    const addCourseRequirement = async (jobId, course) => {
        setLoading(true);
        const payload = {
            jobId: jobId,
            course: course
        }
        const json = await createCourseReq(payload);
        if (json.Status) {
            message.success("Curso adicionado com sucesso!");
            fetchJobData(props.jobId, false);
        }
        else
            message.error("Erro ao adicionar curso.");
        setLoading(false);
    }

    const deleteCourseRequirement = async (courseId) => {
        setLoading(true);
        const json = await deleteCourseReq(courseId);
        if (json.Status) {
            message.success("Curso removido com sucesso!");
            fetchJobData(props.jobId, false);
        }
        else
            message.error("Erro ao remover curso.");
        setLoading(false);
    }

    return (
        <>
            <h3>Selecione os cursos que esta vaga é ofertada</h3>
            <List
                itemLayout="horizontal"
                dataSource={courses}
                pagination={{ pageSize: 10 }}
                renderItem={item => (
                    <List.Item extra={
                        (data && data.courseRequirement.find((e) => e.course === courses.indexOf(item)))
                            ? <Button type="danger" loading={loading} onClick={() => deleteCourseRequirement(data.courseRequirement.find((e) => e.course === courses.indexOf(item)).courseRequirementId)}>Remover</Button>
                            : <Button type="primary" loading={loading} onClick={() => addCourseRequirement(props.jobId, courses.indexOf(item))}>Adicionar</Button>
                    }>
                        <List.Item.Meta title={item} />
                    </List.Item>
                )}
            />
        </>
    );
}

export default CourseRequirementsForm;