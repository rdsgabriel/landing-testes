import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, UserIcon, BuildingIcon, CurrencyIcon } from "lucide-react"

interface Project {
  name: string
  client: string
  startDate: string
  endDate: string
  budget: number
  team: string[]
}

interface CreateProjectModalProps {
  onCreateProject: (project: Project) => void
}

export default function CreateProjectModal({ onCreateProject }: CreateProjectModalProps) {
  const [name, setName] = useState("")
  const [client, setClient] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")
  const [team, setTeam] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const project: Project = {
      name,
      client,
      startDate,
      endDate,
      budget: parseFloat(budget),
      team: team.split(",").map(member => member.trim())
    }

    onCreateProject(project)
  }

  return (
    <DialogContent className="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-purple-700">Criar Novo Projeto <br /><span className="text-red-500">*ainda vai ser implementado!*</span></DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Projeto
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
              placeholder="Digite o nome do projeto"
            />
          </div>
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <div className="relative">
              <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
                className="pl-10 w-full"
                placeholder="Nome do cliente"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Data de Início
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                Data de Término
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="pl-10 w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Orçamento (R$)
            </label>
            <div className="relative">
              <CurrencyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                className="pl-10 w-full"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
              Equipe (separar nomes por vírgula)
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                required
                className="pl-10 w-full"
                placeholder="João Silva, Maria Santos"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Criar Projeto
        </Button>
      </form>
    </DialogContent>
  )
}