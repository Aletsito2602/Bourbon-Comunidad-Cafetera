import { useState, useEffect, useRef, useCallback } from 'react'
import { Plus, Settings, Trash2, Save, Grid, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RestaurantTable, NewTable } from '@/types/comandas'
import { comandasService } from '@/lib/comandas-service'

interface TablesSetupProps {
  onTableSelect?: (table: RestaurantTable) => void
  selectedTableId?: string
  isViewOnly?: boolean
}

export function TablesSetup({ onTableSelect, selectedTableId, isViewOnly = false }: TablesSetupProps) {
  const [tables, setTables] = useState<RestaurantTable[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(null)
  const [draggedTable, setDraggedTable] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [canvasSize] = useState({ width: 800, height: 600 })
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')
  const canvasRef = useRef<HTMLDivElement>(null)

  const loadTables = useCallback(async () => {
    try {
      setIsLoading(true)
      const tablesData = await comandasService.getTables()
      setTables(tablesData)
    } catch (error) {
      console.error('Error loading tables:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTables()
  }, [loadTables])

  useEffect(() => {
    if (isViewOnly) {
      setViewMode('preview')
    }
  }, [isViewOnly])

  const handleAddTable = async (formData: FormData) => {
    const tableData: NewTable = {
      table_number: parseInt(formData.get('table_number') as string),
      table_name: formData.get('table_name') as string || undefined,
      seats: parseInt(formData.get('seats') as string) || 4,
      position_x: 100,
      position_y: 100,
      width: 80,
      height: 80
    }

    try {
      await comandasService.createTable(tableData)
      await loadTables()
      setShowAddForm(false)
    } catch (error) {
      console.error('Error creating table:', error)
      alert('Error al crear la mesa. Verifique que el número no esté en uso.')
    }
  }

  const handleUpdateTable = async (formData: FormData) => {
    if (!editingTable) return

    const updates: Partial<RestaurantTable> = {
      table_name: formData.get('table_name') as string || undefined,
      seats: parseInt(formData.get('seats') as string) || 4,
    }

    try {
      await comandasService.updateTable(editingTable.id, updates)
      await loadTables()
      setEditingTable(null)
    } catch (error) {
      console.error('Error updating table:', error)
      alert('Error al actualizar la mesa')
    }
  }

  const handleDeleteTable = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta mesa?')) return

    try {
      await comandasService.deleteTable(id)
      await loadTables()
    } catch (error) {
      console.error('Error deleting table:', error)
      alert('Error al eliminar la mesa')
    }
  }

  const handleMouseDown = (e: React.MouseEvent, tableId: string) => {
    if (isViewOnly || viewMode === 'preview') return
    
    e.preventDefault()
    setDraggedTable(tableId)
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const table = tables.find(t => t.id === tableId)
      if (table) {
        setDragOffset({
          x: e.clientX - rect.left - table.position_x,
          y: e.clientY - rect.top - table.position_y
        })
      }
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedTable || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const newX = Math.max(0, Math.min(canvasSize.width - 80, e.clientX - rect.left - dragOffset.x))
    const newY = Math.max(0, Math.min(canvasSize.height - 80, e.clientY - rect.top - dragOffset.y))

    setTables(prev => prev.map(table =>
      table.id === draggedTable
        ? { ...table, position_x: newX, position_y: newY }
        : table
    ))
  }, [draggedTable, dragOffset, canvasSize])

  const handleMouseUp = useCallback(async () => {
    if (!draggedTable) return

    const table = tables.find(t => t.id === draggedTable)
    if (table) {
      try {
        await comandasService.updateTablePositions([{
          id: table.id,
          position_x: table.position_x,
          position_y: table.position_y
        }])
      } catch (error) {
        console.error('Error updating table position:', error)
      }
    }
    
    setDraggedTable(null)
  }, [draggedTable, tables])

  useEffect(() => {
    if (draggedTable) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [draggedTable, handleMouseMove, handleMouseUp])

  const handleTableClick = (table: RestaurantTable) => {
    if (onTableSelect && viewMode === 'preview') {
      onTableSelect(table)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {isViewOnly ? 'Seleccionar Mesa' : 'Configuración de Mesas'}
          </h2>
          <p className="text-gray-600">
            {isViewOnly 
              ? 'Selecciona una mesa para tomar el pedido'
              : 'Organiza el layout de tu restaurante'
            }
          </p>
        </div>
        
        {!isViewOnly && (
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'edit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('edit')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Canvas: {canvasSize.width} x {canvasSize.height}px
              </div>
              {viewMode === 'edit' && !isViewOnly && (
                <div className="text-sm text-gray-500">
                  💡 Arrastra las mesas para reorganizarlas
                </div>
              )}
            </div>
            
            {viewMode === 'edit' && !isViewOnly && (
              <Button
                onClick={() => setShowAddForm(true)}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Mesa
              </Button>
            )}
          </div>

          <div
            ref={canvasRef}
            className="relative border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
            style={{ width: canvasSize.width, height: canvasSize.height }}
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div
                className="grid grid-cols-16 grid-rows-12 h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
            </div>

            {/* Tables */}
            {tables.map((table) => (
              <div
                key={table.id}
                className={`
                  absolute flex items-center justify-center text-white font-medium text-sm
                  rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${selectedTableId === table.id
                    ? 'bg-green-600 border-green-800 ring-2 ring-green-300'
                    : 'bg-amber-600 border-amber-800 hover:bg-amber-700'
                  }
                  ${viewMode === 'edit' && !isViewOnly ? 'hover:scale-105' : ''}
                  ${draggedTable === table.id ? 'z-10 scale-110' : 'z-0'}
                `}
                style={{
                  left: table.position_x,
                  top: table.position_y,
                  width: table.width,
                  height: table.height
                }}
                onMouseDown={(e) => handleMouseDown(e, table.id)}
                onClick={() => handleTableClick(table)}
              >
                <div className="text-center">
                  <div className="font-bold">{table.table_number}</div>
                  {table.table_name && (
                    <div className="text-xs opacity-90">{table.table_name}</div>
                  )}
                  <div className="text-xs opacity-75">{table.seats} pers.</div>
                </div>

                {/* Edit Button */}
                {viewMode === 'edit' && !isViewOnly && (
                  <div className="absolute -top-2 -right-2 flex gap-1">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingTable(table)
                      }}
                    >
                      <Settings className="h-3 w-3" />
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteTable(table.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {tables.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Grid className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay mesas configuradas</p>
                  {!isViewOnly && (
                    <Button
                      onClick={() => setShowAddForm(true)}
                      className="mt-4"
                      size="sm"
                    >
                      Agregar Primera Mesa
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Table Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Agregar Nueva Mesa</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleAddTable} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="table_number">Número de Mesa *</Label>
                  <Input
                    id="table_number"
                    name="table_number"
                    type="number"
                    min="1"
                    required
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="seats">Cantidad de Personas</Label>
                  <Input
                    id="seats"
                    name="seats"
                    type="number"
                    min="1"
                    max="20"
                    defaultValue="4"
                    placeholder="4"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="table_name">Nombre de Mesa (opcional)</Label>
                <Input
                  id="table_name"
                  name="table_name"
                  placeholder="ej. Terraza, VIP, Ventana"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Crear Mesa
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Edit Table Form */}
      {editingTable && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Mesa {editingTable.table_number}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleUpdateTable} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_table_number">Número de Mesa</Label>
                  <Input
                    id="edit_table_number"
                    name="table_number"
                    type="number"
                    value={editingTable.table_number}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El número no se puede cambiar
                  </p>
                </div>
                <div>
                  <Label htmlFor="edit_seats">Cantidad de Personas</Label>
                  <Input
                    id="edit_seats"
                    name="seats"
                    type="number"
                    min="1"
                    max="20"
                    defaultValue={editingTable.seats}
                    placeholder="4"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit_table_name">Nombre de Mesa</Label>
                <Input
                  id="edit_table_name"
                  name="table_name"
                  defaultValue={editingTable.table_name || ''}
                  placeholder="ej. Terraza, VIP, Ventana"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingTable(null)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}