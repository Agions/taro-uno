import List from './List'
import ListItem from './ListItem'

// 组合导出
const ListComponent = List as typeof List & {
  Item: typeof ListItem
}

ListComponent.Item = ListItem
ListComponent.displayName = 'List'

export { ListItem }
export default ListComponent
