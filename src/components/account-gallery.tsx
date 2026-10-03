"use client";

import { useState, useSyncExternalStore } from "react";
import AccountCard from "@/components/account-card";
import type { DemoFamily } from "@/data/demo-families";

type DueFilter = "all" | "overdue" | "upcoming";
type AccountSort = "due" | "amount-asc" | "amount-desc";

function subscribeToDayChanges(notify: () => void) {
  const timer = window.setInterval(notify, 60_000);
  return () => window.clearInterval(timer);
}

function getTodayInBrazil() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
}

type AccountGalleryProps = {
  families: DemoFamily[];
};

export default function AccountGallery({ families }: AccountGalleryProps) {
  const [dueFilter, setDueFilter] = useState<DueFilter>("all");
  const [sort, setSort] = useState<AccountSort>("due");
  const today = useSyncExternalStore(subscribeToDayChanges, getTodayInBrazil, () => "");

  const filteredFamilies = families.filter((family) => {
    if (!today || dueFilter === "all") return true;
    const isOverdue = family.account.dueDate < today;
    return dueFilter === "overdue" ? isOverdue : !isOverdue;
  });

  const sortedFamilies = [...filteredFamilies].sort((first, second) => {
    if (sort === "amount-asc") {
      return first.account.amount - second.account.amount || first.account.dueDate.localeCompare(second.account.dueDate);
    }
    if (sort === "amount-desc") {
      return second.account.amount - first.account.amount || first.account.dueDate.localeCompare(second.account.dueDate);
    }
    return first.account.dueDate.localeCompare(second.account.dueDate);
  });

  return (
    <>
      <div className="filter-row" aria-label="Filtros de contas demonstrativas">
        <label className="filter-control">
          Vencimento
          <select value={dueFilter} onChange={(event) => setDueFilter(event.target.value as DueFilter)}>
            <option value="all">Todas as contas</option>
            <option value="overdue">Somente vencidas</option>
            <option value="upcoming">Somente a vencer</option>
          </select>
        </label>
        <label className="filter-control">
          Valor
          <select value={sort} onChange={(event) => setSort(event.target.value as AccountSort)}>
            <option value="due">Vencidas e mais próximas primeiro</option>
            <option value="amount-asc">Menor valor primeiro</option>
            <option value="amount-desc">Maior valor primeiro</option>
          </select>
        </label>
      </div>
      <p className="gallery-count" aria-live="polite">
        {filteredFamilies.length} {filteredFamilies.length === 1 ? "exemplo demonstrativo" : "exemplos demonstrativos"}
      </p>
      {sortedFamilies.length > 0 ? (
        <div className="account-grid">
          {sortedFamilies.map((family) => (
            <AccountCard
              key={family.slug}
              family={family}
              isOverdue={today !== "" && family.account.dueDate < today}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">Não há contas nesta faixa de vencimento.</p>
      )}
    </>
  );
}