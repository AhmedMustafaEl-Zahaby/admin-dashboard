import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import { Text } from '../text'
import {UpcomingEventsSkeleton} from '../'
import { useList } from '@refinedev/core'
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import { getDate } from '@/utilities/helpers'
import dayjs from 'dayjs'

const UpcommingEvents = () => {
    const {data , isLoading} = useList({
        resource: 'events',
        pagination: {pageSize: 5},
        sorters: [
            {
                field:'startDate',
                order: 'asc'
            }
        ],
        filters: [
            {
                field:'startDate',
                operator: 'gte',
                value: dayjs().format('YYYY-MM-DD')
            }
        ],
        meta: {
            gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY
        }
    })
  return (
    <Card
    title={
        <div style={{
            display:'flex',
            alignItems:'center',
            gap: '8px'
        }}>
            <CalendarOutlined />
            <Text size='sm' style={{
                marginLeft: "0.7 rem"
            }}>
                Upcoming Events
            </Text>
        </div>
    }
    style={{
        height: "100%",
    }}
    styles={{
        header: {
          padding: '8px 16px'
        },
        body: {
          padding: '0 1rem'
        }
    }}
    >
        {
            isLoading ?(
                <List
                itemLayout='horizontal'
                dataSource={Array.from({length: 5}).map((_ ,index) => (
                    {
                        id: index
                    }
                ))}
                renderItem={() => <UpcomingEventsSkeleton />}
                >

                </List>
            ):
            (
                <List
                itemLayout='horizontal'
                dataSource={data?.data || []}
                renderItem={(item) => {
                    const renderDate = getDate(item.startDate , item.endDate)
                    return (
                        <List.Item>
                            <List.Item.Meta
                                avatar = {<Badge color={item.color} />}
                                title = {<Text size='xs'>{renderDate}</Text>}
                                description = {<Text ellipsis={{ tooltip: true}} strong>
                                    {
                                        item.title
                                    }
                                </Text>}
                            />
                        </List.Item>
                    )
                }}
                >
                </List>
            )
        }
        {
                        !isLoading && data?.data.length === 0 && (
                        <span style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: '220px'
                        }}>
                            No Upcoming Events
                        </span>)
        }
    </Card>
  )
}

export default UpcommingEvents