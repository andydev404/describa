export const TotalCostLabel = ({
  totalCreditsCost
}: {
  totalCreditsCost: number
}) => (
  <div className="flex items-center gap-1 rounded-medium border border-primary-100 bg-primary-100/50 px-4 py-2 text-small text-foreground">
    <h2 className="font-medium">Total cost:</h2>
    <h3 className="font-semibold">
      {totalCreditsCost} credit{totalCreditsCost > 1 ? 's' : ''}
    </h3>
  </div>
)
