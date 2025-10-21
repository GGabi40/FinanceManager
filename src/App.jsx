// src/App.jsx
import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import UserProfileCard from './components/UserProfileCard.jsx'
import BalanceSummary from './components/BalanceSummary.jsx'
import QuickAddTransaction from './components/QuickAddTransaction.jsx'
import TransactionsFilter from './components/TransactionsFilter.jsx'
import TransactionsList from './components/TransactionsList.jsx'
import Notes from './components/Notes.jsx'
import TransactionModal from './components/TransactionModal.jsx'
import NoteModal from './components/NoteModal.jsx'
import { storage } from './utils/storage.js'

const defaultUser = { id: 1, username: 'Usuario', email: 'usuario@ejemplo.com', active: true }

export default function App() {
  const [showProfile, setShowProfile] = useState(false)
  const [user, setUser] = useState(defaultUser)
  const [transactions, setTransactions] = useState([])
  const [notes, setNotes] = useState([])

  const [filters, setFilters] = useState({ category: 'all', type: 'all' })

  const [txModal, setTxModal] = useState({ open: false, tx: null })
  const [noteModal, setNoteModal] = useState({ open: false, note: null })

  useEffect(() => {
    if (!storage.getUser()) {
      storage.setUser(defaultUser)
      const sampleTransactions = [
        { id: 1, userId: 1, type: 'income', amount: 1500, category: 'salario', description: 'Salario mensual', date: new Date().toISOString() },
        { id: 2, userId: 1, type: 'expense', amount: 120, category: 'comida', description: 'Supermercado', date: new Date().toISOString() },
        { id: 3, userId: 1, type: 'expense', amount: 50, category: 'transporte', description: 'Gasolina', date: new Date().toISOString() }
      ]
      localStorage.setItem('expenseTrackerTransactions', JSON.stringify(sampleTransactions))
      const sampleNotes = [
        { id: 1, userId: 1, title: 'Recordatorio', content: 'Pagar el alquiler el día 5', pinned: true, createdAt: new Date().toISOString() },
        { id: 2, userId: 1, title: 'Ideas', content: 'Ahorrar para vacaciones', pinned: false, createdAt: new Date().toISOString() }
      ]
      localStorage.setItem('expenseTrackerNotes', JSON.stringify(sampleNotes))
    }
    const u = storage.getUser() || defaultUser
    setUser(u)
    setTransactions(storage.getTransactions(u.id))
    setNotes(storage.getNotes(u.id))
  }, [])

  // Persistencia
  useEffect(() => { storage.setUser(user) }, [user])
  useEffect(() => { storage.setTransactions(user.id, transactions) }, [transactions, user.id])
  useEffect(() => { storage.setNotes(user.id, notes) }, [notes, user.id])

  // Balance memo
  const balance = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0)
    return { income, expense, total: income - expense }
  }, [transactions])

  // Handlers de usuario
  const handleSaveUser = (partial) => setUser(prev => ({ ...prev, ...partial }))
  const handleDeleteUser = () => setUser(prev => ({ ...prev, active: false }))

  // Handlers de transacciones
  const addTransaction = (tx) => {
    const id = transactions.length ? Math.max(...transactions.map(t => t.id)) + 1 : 1
    setTransactions(prev => [...prev, { ...tx, id, userId: user.id, date: new Date().toISOString() }])
  }
  const openEditTransaction = (id) => {
    const tx = transactions.find(t => t.id === id)
    if (tx) setTxModal({ open: true, tx })
  }
  const saveTransaction = (edited) => {
    setTransactions(prev => prev.map(t => (t.id === edited.id ? { ...t, ...edited } : t)))
    setTxModal({ open: false, tx: null })
  }
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
    setTxModal({ open: false, tx: null })
  }

  // Handlers de notas
  const addNote = (note) => {
    const id = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1
    setNotes(prev => [...prev, { ...note, id, userId: user.id, createdAt: new Date().toISOString() }])
  }
  const openEditNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (note) setNoteModal({ open: true, note })
  }
  const saveNote = (edited) => {
    setNotes(prev => prev.map(n => (n.id === edited.id ? { ...n, ...edited } : n)))
    setNoteModal({ open: false, note: null })
  }
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    setNoteModal({ open: false, note: null })
  }

  // Filtros
  const filteredTransactions = useMemo(() => {
    const c = filters.category
    const t = filters.type
    return [...transactions]
      .filter(tr => (c === 'all' || tr.category === c) && (t === 'all' || tr.type === t))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, filters])

  return (
    <div className="container py-4">
      <Header username={user.username} onToggleProfile={() => setShowProfile(s => !s)} />

      <div className="row g-4">
        <div className="col-lg-4 d-flex flex-column gap-4">
          {/* --- componente card usuario --- */}
          {showProfile && (
            <UserProfileCard
              user={user}
              onSave={handleSaveUser}
              onDelete={handleDeleteUser}
            />
          )}

          {/* --- componente resumen --- */}
          <BalanceSummary balance={balance} />

          {/* --- componente agregar-transaccion --- */}
          <QuickAddTransaction onAdd={addTransaction} />
        </div>

        <div className="col-lg-8 d-flex flex-column gap-4">
          {/* --- componente filtro-transacciones --- */}
          <TransactionsFilter
            category={filters.category}
            type={filters.type}
            onChange={setFilters}
          />

          {/* --- componente lista-transacciones --- */}
          <TransactionsList items={filteredTransactions} onEdit={openEditTransaction} />

          {/* --- componente notas --- */}
          <Notes notes={notes} onCreate={addNote} onEdit={openEditNote} />
        </div>
      </div>

      {/* --- componente modal-transaccion --- */}
      <TransactionModal
        open={txModal.open}
        tx={txModal.tx}
        onClose={() => setTxModal({ open: false, tx: null })}
        onSave={saveTransaction}
        onDelete={() => deleteTransaction(txModal.tx?.id)}
      />

      {/* --- componente modal-nota --- */}
      <NoteModal
        open={noteModal.open}
        note={noteModal.note}
        onClose={() => setNoteModal({ open: false, note: null })}
        onSave={saveNote}
        onDelete={() => deleteNote(noteModal.note?.id)}
      />
    </div>
  )
}
