'use client'
import * as React from "react"
import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Task {
  id: string
  title: string
  status: string
  label: string
  priority: string
}

const data: Task[] = [
  {
    id: "TASK-8782",
    title: "Você não pode compactar o programa sem quantificar o pixel SSD de código aberto!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-8782",
    title: "Você não pode compactar o programa sem quantificar o pixel SSD de código aberto!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title: "Tente calcular o feed EXE, talvez isso indexe o pixel multi-byte!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "Precisamos contornar o cartão TCP neural!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5562",
    title: "A interface SAS está fora do ar, contorne o pixel de código aberto para que possamos fazer backup da largura de banda PNG!",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-8686",
    title: "Vou analisar o protocolo SSL sem fio, isso deve controlar o painel da API!",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-1280",
    title: "Use o painel TLS digital, então você pode transmitir o sistema háptico!",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-7262",
    title: "A aplicação UTF8 está fora do ar, analise a largura de banda neural para que possamos fazer backup do firewall PNG!",
    status: "done",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1138",
    title: "Gerar o driver não fará nada, precisamos quantificar a largura de banda SMTP 1080p!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-7184",
    title: "Precisamos programar o pixel THX back-end!",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-5160",
    title: "Calcular o ônibus não fará nada, precisamos navegar pelo protocolo JSON back-end!",
    status: "in progress",
    label: "documentation",
    priority: "high",
  },
]


export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
]

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.label}
        </div>
      )
    },
    filterFn: (row, id, value:string[]) => {
      return Array.isArray(value) && value.includes(row.getValue(id) as string)
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.label}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id) as string)
    },
  },
]

function TaskModal({ task }: { task: Task }) {
  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>{task.title}</DialogTitle>
        <DialogDescription>
          ID: {task.id}
          <br />
          Status: {task.status}
          <br />
          Priority: {task.priority}
          <br />
          Label: {task.label}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

function CreateTaskModal() {
  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Add nova Task *IMPLEMENTAR</DialogTitle>
        <DialogDescription>
          <form className="space-y-4 ">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Input id="title" placeholder="Entre com o título" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select id="status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select id="priority" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                Label
              </label>
              <select id="label" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {labels.map((label) => (
                  <option key={label.value} value={label.value}>
                    {label.label}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Add Task</Button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        
        <Input
          placeholder="Filtre suas tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Status <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="flex items-center px-3 py-2">
              <Input
                placeholder="Search status..."
                className="h-8 w-full"
                value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("status")?.setFilterValue(event.target.value)
                }
              />
            </div>
            {statuses.map((status) => (
  <DropdownMenuCheckboxItem
    key={status.value}
    className="capitalize"
    checked={(() => {
      const filterValue = table.getColumn("status")?.getFilterValue();
      return Array.isArray(filterValue) && filterValue.some((item) => item === status.value);
    })() ?? false}
    onCheckedChange={(value) => {
      const currentFilterValue = table.getColumn("status")?.getFilterValue() as string[] | undefined;

      if (value) {
        table.getColumn("status")?.setFilterValue([
          ...(currentFilterValue || []),
          status.value,
        ]);
      } else {
        table.getColumn("status")?.setFilterValue(
          (currentFilterValue || []).filter((s) => s !== status.value)
        );
      }
    }}
  >
    {status.label}
  </DropdownMenuCheckboxItem>
))}


          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
            Prioridade <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="flex items-center px-3 py-2">
              <Input
                placeholder="Search priority..."
                className="h-8 w-full"
                value={(table.getColumn("priority")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("priority")?.setFilterValue(event.target.value)
                }
              />
            </div>
            {priorities.map((priority) => (
  <DropdownMenuCheckboxItem
    key={priority.value}
    className="capitalize"
    checked={(() => {
      const filterValue = table.getColumn("priority")?.getFilterValue();
      return Array.isArray(filterValue) && filterValue.some((item) => item === priority.value);
    })() ?? false}
    onCheckedChange={(value) => {
      const currentFilterValue = table.getColumn("priority")?.getFilterValue() as string[] | undefined;

      if (value) {
        table.getColumn("priority")?.setFilterValue([
          ...(currentFilterValue || []),
          priority.value,
        ]);
      } else {
        table.getColumn("priority")?.setFilterValue(
          (currentFilterValue || []).filter((p) => p !== priority.value)
        );
      }
    }}
  >
    {priority.label}
  </DropdownMenuCheckboxItem>
))}

          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              View <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-1 bg-gray-100 text-purple-600  border-purple-600 border hover:bg-purple-200 ">
              <PlusCircledIcon className="mr-1 h-4 w-4" />
              Add
            </Button>
          </DialogTrigger>
          <CreateTaskModal />
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "title" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="p-0 h-auto">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Button>
                          </DialogTrigger>
                          <TaskModal task={row.original} />
                        </Dialog>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linhas(s)
          selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Olá!</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Aqui está a lista contendo suas <span className="font-bold">Tasks</span>, Engix.
          </p>
        </div>
        <div className="flex items-center space-x-2">

        <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback></AvatarFallback>
          </Avatar>

        </div>
      </div>
      <DataTable />
    </div>
  )
}