import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'Низкий' | 'Средний' | 'Высокий' | 'Критичный';
  status: 'Новая' | 'В работе' | 'Выполнена' | 'Отменена';
  store: string;
  category: string;
  createdAt: string;
  assignedTo?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TK-001',
      title: 'Проблема с кассовой системой',
      description: 'Касса №3 не печатает чеки',
      priority: 'Высокий',
      status: 'В работе',
      store: 'Светофор №45 (ул. Ленина)',
      category: 'Кассовое оборудование',
      createdAt: '2024-01-15 09:30',
      assignedTo: 'Иван Петров'
    },
    {
      id: 'TK-002',
      title: 'Настройка Wi-Fi точки',
      description: 'Требуется настроить новую точку доступа в торговом зале',
      priority: 'Средний',
      status: 'Новая',
      store: 'Светофор №12 (пр. Мира)',
      category: 'Сетевое оборудование',
      createdAt: '2024-01-15 11:15'
    }
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    store: '',
    category: '',
    contact: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
      title: formData.title,
      description: formData.description,
      priority: formData.priority as Ticket['priority'],
      status: 'Новая',
      store: formData.store,
      category: formData.category,
      createdAt: new Date().toLocaleString('ru-RU')
    };
    
    setTickets([newTicket, ...tickets]);
    setFormData({ title: '', description: '', priority: '', store: '', category: '', contact: '' });
    setShowSuccess(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критичный': return 'bg-red-500';
      case 'Высокий': return 'bg-orange-500';
      case 'Средний': return 'bg-yellow-500';
      case 'Низкий': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return 'bg-blue-100 text-blue-800';
      case 'В работе': return 'bg-yellow-100 text-yellow-800';
      case 'Выполнена': return 'bg-green-100 text-green-800';
      case 'Отменена': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IT ПОДДЕРЖКА</h1>
                <p className="text-sm text-gray-600">Сеть магазинов Светофор</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <Icon name="Clock" size={16} className="inline mr-1" />
                24/7 Поддержка
              </div>
              <div className="text-sm text-gray-600">
                <Icon name="Phone" size={16} className="inline mr-1" />
                8-800-555-0123
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Создать заявку</TabsTrigger>
            <TabsTrigger value="track">Отслеживание</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
          </TabsList>

          {/* Create Ticket */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Plus" size={20} />
                  Создать заявку на IT-поддержку
                </CardTitle>
                <CardDescription>
                  Опишите проблему или услугу, которая вам необходима
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Тема заявки</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Кратко опишите проблему"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Низкий">Низкий</SelectItem>
                          <SelectItem value="Средний">Средний</SelectItem>
                          <SelectItem value="Высокий">Высокий</SelectItem>
                          <SelectItem value="Критичный">Критичный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="store">Магазин</Label>
                      <Select value={formData.store} onValueChange={(value) => setFormData({ ...formData, store: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите магазин" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Светофор №12 (пр. Мира)">Светофор №12 (пр. Мира)</SelectItem>
                          <SelectItem value="Светофор №45 (ул. Ленина)">Светофор №45 (ул. Ленина)</SelectItem>
                          <SelectItem value="Светофор №78 (ул. Гагарина)">Светофор №78 (ул. Гагарина)</SelectItem>
                          <SelectItem value="Светофор №101 (пл. Победы)">Светофор №101 (пл. Победы)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Кассовое оборудование">Кассовое оборудование</SelectItem>
                          <SelectItem value="Сетевое оборудование">Сетевое оборудование</SelectItem>
                          <SelectItem value="Компьютеры и ПО">Компьютеры и ПО</SelectItem>
                          <SelectItem value="Телефония">Телефония</SelectItem>
                          <SelectItem value="Видеонаблюдение">Видеонаблюдение</SelectItem>
                          <SelectItem value="Прочее">Прочее</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact">Контактное лицо</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="ФИО и телефон"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание проблемы</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Подробно опишите проблему или требуемую услугу"
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Track Tickets */}
          <TabsContent value="track" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Отслеживание заявок</h2>
                <p className="text-gray-600">Текущие и завершенные заявки</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-blue-50">
                  Всего заявок: {tickets.length}
                </Badge>
                <Badge variant="outline" className="bg-yellow-50">
                  В работе: {tickets.filter(t => t.status === 'В работе').length}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{ticket.title}</h3>
                          <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Номер:</span>
                            <p className="font-mono">{ticket.id}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Магазин:</span>
                            <p>{ticket.store}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Категория:</span>
                            <p>{ticket.category}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Создана:</span>
                            <p>{ticket.createdAt}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        {ticket.assignedTo && (
                          <p className="text-sm text-gray-600 mt-2">
                            <Icon name="User" size={14} className="inline mr-1" />
                            {ticket.assignedTo}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">IT-услуги для магазинов</h2>
              <p className="text-gray-600">Полный спектр технической поддержки</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Кассовое оборудование',
                  description: 'Обслуживание, ремонт и настройка кассовых аппаратов',
                  icon: 'Calculator',
                  features: ['Диагностика неисправностей', 'Замена комплектующих', 'Обновление ПО']
                },
                {
                  title: 'Сетевая инфраструктура',
                  description: 'Настройка и поддержка сетевого оборудования',
                  icon: 'Wifi',
                  features: ['Настройка роутеров', 'Прокладка кабелей', 'Устранение проблем']
                },
                {
                  title: 'Компьютеры и ПО',
                  description: 'Техническая поддержка компьютерной техники',
                  icon: 'Monitor',
                  features: ['Установка программ', 'Устранение вирусов', 'Апгрейд железа']
                },
                {
                  title: 'Телефонная связь',
                  description: 'Обслуживание телефонных систем',
                  icon: 'Phone',
                  features: ['Настройка АТС', 'Подключение линий', 'Ремонт аппаратов']
                },
                {
                  title: 'Видеонаблюдение',
                  description: 'Монтаж и обслуживание систем безопасности',
                  icon: 'Camera',
                  features: ['Установка камер', 'Настройка записи', 'Удаленный доступ']
                },
                {
                  title: 'Экстренный выезд',
                  description: 'Срочное устранение критичных проблем',
                  icon: 'Zap',
                  features: ['Выезд в течение часа', 'Работа 24/7', 'Приоритетное обслуживание']
                }
              ].map((service) => (
                <Card key={service.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={service.icon as any} size={20} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" size={14} className="text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Icon name="CheckCircle" size={20} className="text-green-500" />
              Заявка успешно создана!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ваша заявка принята в обработку. Номер заявки: <strong>TK-{String(tickets.length).padStart(3, '0')}</strong>
              <br />
              Вы можете отслеживать статус в разделе "Отслеживание".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setActiveTab('track')}>
              Перейти к отслеживанию
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;