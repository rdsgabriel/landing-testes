"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PlusCircledIcon, MagnifyingGlassIcon, GridIcon, TableIcon } from "@radix-ui/react-icons"
import CreateProjectModal from "./createprojectmodal"

interface Project {
  id: number
  name: string
  client: string
  tasksCompleted: number
  totalTasks: number
  startDate: string
  endDate: string
  budget: number
  team: string[]
}

export default function DashboardProjetos() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Redesenho do Site Institucional", client: "Consultar Engenharia", tasksCompleted: 15, totalTasks: 20, startDate: "2023-05-01", endDate: "2023-08-31", budget: 150000, team: ["Brincadeira", "tem ", "hora"] },
    { id: 2, name: "App de Delivery", client: "iFood", tasksCompleted: 8, totalTasks: 30, startDate: "2023-06-15", endDate: "2023-12-31", budget: 300000, team: ["Pedro Alves", "Juliana Lima"] },
    { id: 3, name: "Sistema de Gestão de Estoque", client: "Lojas Americanas", tasksCompleted: 22, totalTasks: 22, startDate: "2023-03-01", endDate: "2023-07-15", budget: 180000, team: ["Roberto Ferreira", "Camila Costa", "Lucas Mendes"] },
    { id: 4, name: "Plataforma de EAD", client: "FIAP", tasksCompleted: 5, totalTasks: 25, startDate: "2023-07-01", endDate: "2024-01-31", budget: 250000, team: ["Fernanda Souza", "Ricardo Gomes"] },
    { id: 5, name: "Automação de Marketing", client: "Natura", tasksCompleted: 0, totalTasks: 15, startDate: "2023-08-01", endDate: "2023-11-30", budget: 120000, team: ["Tatiana Almeida", "Gabriel Santos"] },
    { id: 6, name: "App de Monitoramento Fitness", client: "Smart Fit", tasksCompleted: 18, totalTasks: 18, startDate: "2023-04-15", endDate: "2023-09-30", budget: 200000, team: ["Renato Lima", "Carla Rodrigues", "Diego Fernandes"] },
    { id: 7, name: "Integração de ERP", client: "Magazine Luiza", tasksCompleted: 13, totalTasks: 15, startDate: "2023-05-10", endDate: "2023-10-30", budget: 220000, team: ["Eduardo Santos", "Viviane Costa"] },
    { id: 8, name: "Portal de Autoatendimento", client: "Bradesco", tasksCompleted: 4, totalTasks: 20, startDate: "2023-07-01", endDate: "2023-12-31", budget: 180000, team: ["Bruno Oliveira", "Paula Lima"] },
    { id: 9, name: "Sistema de CRM", client: "Stone", tasksCompleted: 6, totalTasks: 12, startDate: "2023-04-20", endDate: "2023-09-20", budget: 150000, team: ["Larissa Martins", "Roberto Costa", "João Pereira"] },
    { id: 10, name: "App de Finanças Pessoais", client: "XP Investimentos", tasksCompleted: 9, totalTasks: 15, startDate: "2023-06-01", endDate: "2023-11-30", budget: 275000, team: ["Mariana Santos", "Carlos Oliveira"] },
    { id: 11, name: "Sistema de Automação Industrial", client: "Embraer", tasksCompleted: 20, totalTasks: 20, startDate: "2023-08-01", endDate: "2024-01-15", budget: 320000, team: ["Rafael Costa", "Luciana Gomes"] },
    { id: 12, name: "Plataforma de Gestão de RH", client: "Totvs", tasksCompleted: 7, totalTasks: 14, startDate: "2023-07-15", endDate: "2023-12-15", budget: 210000, team: ["Patrícia Souza", "Fernando Mendes"] }
]);

  const [nameFilter, setNameFilter] = useState("")
  const [clientFilter, setClientFilter] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"card" | "table">("card")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      project.client.toLowerCase().includes(clientFilter.toLowerCase())
  )

  const handleCreateProject = (newProject: Omit<Project, "id" | "tasksCompleted" | "totalTasks">) => {
    const createdProject = {
      id: projects.length + 1,
      ...newProject,
      tasksCompleted: 0,
      totalTasks: 0,
    }
    setProjects([...projects, createdProject])
    setIsCreateModalOpen(false)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:flex md:justify-between md:items-center">
        <div className="flex flex-col md:flex-row md:space-x-2 md:items-center w-full md:w-auto">
          <div className="relative hidden md:block">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Filtrar por nome do projeto"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="pl-8 max-w-xs"
            />
          </div>
          <div className="relative mb-4 md:mb-0 w-full md:w-auto">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Filtrar por cliente"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="pl-8 w-full md:max-w-xs"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={toggleViewMode} variant="outline" size="icon" className="hidden md:flex">
                  {viewMode === "card" ? <TableIcon /> : <GridIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Alternar visualização de {viewMode === "card" ? "cartões" : "tabela"} para {viewMode === "card" ? "tabela" : "cartões"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full md:w-auto">
              <PlusCircledIcon className="mr-1 h-4 w-4" />
              Criar novo Projeto
            </Button>
          </DialogTrigger>
          <CreateProjectModal onCreateProject={handleCreateProject} />
        </Dialog>
      </div>
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
          {filteredProjects.map((project) => (
            <Dialog key={project.id}>
              <Card className="cursor-pointer hover:bg-gray-50 flex flex-col h-[280px]">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold line-clamp-2 h-14 flex-grow pr-2">{project.name}</CardTitle>
                  {project.tasksCompleted === project.totalTasks && project.totalTasks > 0 && (
                    <Badge className="bg-purple-600 text-white hover:bg-purple-700 shrink-0 mt-0.5">
                      Concluído
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between py-2">
                  <div>
                    <Badge variant="outline" className="mb-2 text-purple-600 border-purple-600 truncate max-w-full">
                      {project.client}
                    </Badge>
                    <div className="text-sm text-gray-600 mb-2">
                      Tarefas: {project.tasksCompleted}/{project.totalTasks}
                    </div>
                    <Progress 
                      value={(project.tasksCompleted / project.totalTasks) * 100} 
                      className="w-full"
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {Math.round((project.tasksCompleted / project.totalTasks) * 100)}% concluído
                  </div>
                </CardContent>
                <CardFooter className="mt-auto pt-2">
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-purple-600 border-purple-600 hover:text-purple-600 hover:bg-purple-50">
                      Ver detalhes
                    </Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-purple-700">{project.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p><span className="font-semibold">Cliente:</span> {project.client}</p>
                  <p><span className="font-semibold">Tarefas concluídas:</span> {project.tasksCompleted}/{project.totalTasks}</p>
                  <p><span className="font-semibold">Progresso:</span> {Math.round((project.tasksCompleted / project.totalTasks) * 100)}%</p>
                  <p><span className="font-semibold">Data de início:</span> {new Date(project.startDate).toLocaleDateString('pt-BR')}</p>
                  <p><span className="font-semibold">Data de término prevista:</span> {new Date(project.endDate).toLocaleDateString('pt-BR')}</p>
                  <p><span className="font-semibold">Orçamento:</span> R$ {project.budget.toLocaleString('pt-BR')}</p>
                  <p><span className="font-semibold">Equipe:</span> {project.team.join(', ')}</p>
                  {project.tasksCompleted === project.totalTasks && project.totalTasks > 0 && (
                    <Badge className="bg-purple-600 text-white hover:bg-purple-700 mt-2">
                      Projeto Concluído
                    </Badge>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto md:overflow-x-visible">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Projeto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-purple-600 border-purple-600">
                        {project.client}
                      </Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={(project.tasksCompleted / project.totalTasks) * 100} 
                        className="w-[60px]"
                      />
                      <span className="text-sm text-gray-600">
                        {Math.round((project.tasksCompleted / project.totalTasks) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.tasksCompleted === project.totalTasks && project.totalTasks > 0 ? (
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Concluído</Badge>
                    ) : (
                      <Badge variant="secondary">Em andamento</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-purple-600 hover:text-purple-600 border-purple-600 hover:bg-purple-50">Ver detalhes</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-purple-700">{project.name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p><span className="font-semibold">Cliente:</span> {project.client}</p>
                          <p><span className="font-semibold">Tarefas concluídas:</span> {project.tasksCompleted}/{project.totalTasks}</p>
                          <p><span className="font-semibold">Progresso:</span> {Math.round((project.tasksCompleted / project.totalTasks) * 100)}%</p>
                          <p><span className="font-semibold">Data de início:</span> {new Date(project.startDate).toLocaleDateString('pt-BR')}</p>
                          <p><span className="font-semibold">Data de término prevista:</span> {new Date(project.endDate).toLocaleDateString('pt-BR')}</p>
                          <p><span className="font-semibold">Orçamento:</span> R$ {project.budget.toLocaleString('pt-BR')}</p>
                          <p><span className="font-semibold">Equipe:</span> {project.team.join(', ')}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}