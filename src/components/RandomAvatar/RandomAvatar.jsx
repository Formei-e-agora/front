import React from 'react';
import { Avatar } from 'antd';
import { colors } from '../../helpers/colors';
import {
    AreaChartOutlined,
    RadarChartOutlined,
    FundOutlined,
    AppleOutlined,
    AliwangwangOutlined,
    DingdingOutlined,
    WeiboSquareOutlined,
    TaobaoCircleOutlined,
    AlipayCircleOutlined,
    WeiboOutlined,
    QqOutlined,
    GitlabOutlined,
    CodeSandboxOutlined,
    CodepenOutlined,
    CodepenCircleOutlined,
    BehanceSquareOutlined,
    DribbbleSquareOutlined,
    SketchOutlined,
    AccountBookOutlined,
    AlertOutlined,
    BankOutlined,
    AuditOutlined,
    AppstoreOutlined,
    CarOutlined,
    CameraOutlined,
    CoffeeOutlined,
    CompassOutlined,
    ExperimentOutlined,
    FireOutlined,
    GlobalOutlined,
    InsuranceOutlined,
    ScheduleOutlined,
    SkinOutlined,
    SmileOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const iconList = [
    <AreaChartOutlined style={{ color: '#FFF' }} />,
    <RadarChartOutlined style={{ color: '#FFF' }} />,
    <FundOutlined style={{ color: '#FFF' }} />,
    <AppleOutlined style={{ color: '#FFF' }} />,
    <AliwangwangOutlined style={{ color: '#FFF' }} />,
    <DingdingOutlined style={{ color: '#FFF' }} />,
    <WeiboSquareOutlined style={{ color: '#FFF' }} />,
    <TaobaoCircleOutlined style={{ color: '#FFF' }} />,
    <AlipayCircleOutlined style={{ color: '#FFF' }} />,
    <WeiboOutlined style={{ color: '#FFF' }} />,
    <QqOutlined style={{ color: '#FFF' }} />,
    <GitlabOutlined style={{ color: '#FFF' }} />,
    <CodeSandboxOutlined style={{ color: '#FFF' }} />,
    <CodepenOutlined style={{ color: '#FFF' }} />,
    <CodepenCircleOutlined style={{ color: '#FFF' }} />,
    <BehanceSquareOutlined style={{ color: '#FFF' }} />,
    <DribbbleSquareOutlined style={{ color: '#FFF' }} />,
    <SketchOutlined style={{ color: '#FFF' }} />,
    <AccountBookOutlined style={{ color: '#FFF' }} />,
    <AlertOutlined style={{ color: '#FFF' }} />,
    <BankOutlined style={{ color: '#FFF' }} />,
    <AuditOutlined style={{ color: '#FFF' }} />,
    <AppstoreOutlined style={{ color: '#FFF' }} />,
    <CarOutlined style={{ color: '#FFF' }} />,
    <CameraOutlined style={{ color: '#FFF' }} />,
    <CoffeeOutlined style={{ color: '#FFF' }} />,
    <CompassOutlined style={{ color: '#FFF' }} />,
    <ExperimentOutlined style={{ color: '#FFF' }} />,
    <FireOutlined style={{ color: '#FFF' }} />,
    <GlobalOutlined style={{ color: '#FFF' }} />,
    <InsuranceOutlined style={{ color: '#FFF' }} />,
    <ScheduleOutlined style={{ color: '#FFF' }} />,
    <SkinOutlined style={{ color: '#FFF' }} />,
    <SmileOutlined style={{ color: '#FFF' }} />,
    <TrophyOutlined style={{ color: '#FFF' }} />
];

const RandomAvatar = (props) => {
    const icon = iconList[props.id%iconList.length];
    return (
        <Avatar size="large" style={{ backgroundColor: '#' + colors[props.id%colors.length] }} icon={icon} />
    );
};

export default RandomAvatar;
