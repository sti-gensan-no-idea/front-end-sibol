import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  IconCreditCard,
  IconPlus,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconCurrencyPeso,
} from "@tabler/icons-react";

import { usePayments, type PaymentType, type PaymentStatus } from "../hooks";

interface PaymentDashboardProps {
  className?: string;
}

export const PaymentDashboard = ({ className }: PaymentDashboardProps) => {
  const {
    payments,
    createPayment,
    updatePaymentStatus,
    getPaymentsByStatus,
    getTotalRevenue,
    getPendingPayments,
    loading,
    error,
  } = usePayments();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    property_id: "",
    amount: "",
    payment_type: "reservation" as PaymentType,
  });

  const paymentTypes: { key: PaymentType; label: string }[] = [
    { key: "reservation", label: "Reservation Fee" },
    { key: "downpayment", label: "Down Payment" },
    { key: "monthly", label: "Monthly Payment" },
    { key: "maintenance", label: "Maintenance Fee" },
  ];

  const paymentStatuses: { key: PaymentStatus; label: string; color: any }[] = [
    { key: "pending", label: "Pending", color: "warning" },
    { key: "processing", label: "Processing", color: "primary" },
    { key: "completed", label: "Completed", color: "success" },
    { key: "failed", label: "Failed", color: "danger" },
    { key: "cancelled", label: "Cancelled", color: "default" },
  ];

  const totalRevenue = getTotalRevenue();
  const pendingPayments = getPendingPayments();
  const completedPayments = getPaymentsByStatus("completed");
  const failedPayments = getPaymentsByStatus("failed");

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePayment = async () => {
    if (!formData.property_id || !formData.amount) {
      return;
    }

    const paymentData = {
      property_id: formData.property_id,
      amount: parseFloat(formData.amount),
      payment_type: formData.payment_type,
    };

    const success = await createPayment(paymentData);

    if (success) {
      // Reset form
      setFormData({
        property_id: "",
        amount: "",
        payment_type: "reservation",
      });

      setIsCreateModalOpen(false);
    }
  };

  const getStatusColor = (status: PaymentStatus) => {
    const statusObj = paymentStatuses.find((s) => s.key === status);

    return statusObj?.color || "default";
  };

  const getTypeColor = (type: PaymentType) => {
    switch (type) {
      case "reservation":
        return "primary";
      case "downpayment":
        return "warning";
      case "monthly":
        return "secondary";
      case "maintenance":
        return "default";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading && payments.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <IconCreditCard className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Payment Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Track and manage payments
                </p>
              </div>
            </div>
            <Button
              color="primary"
              startContent={<IconPlus />}
              onPress={() => setIsCreateModalOpen(true)}
            >
              New Payment
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="text-center">
            <IconCurrencyPeso className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="text-sm opacity-90">Total Revenue</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <IconClock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">
              {pendingPayments.length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <IconCheck className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">
              {completedPayments.length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <IconAlertCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-600">
              {failedPayments.length}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </CardBody>
        </Card>
      </div>

      {/* Pending Payments Alert */}
      {pendingPayments.length > 0 && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-orange-800">
              <IconClock className="w-5 h-5" />
              <h4 className="font-semibold">Payments Awaiting Processing</h4>
            </div>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            {pendingPayments.slice(0, 3).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {formatCurrency(payment.amount)}
                    </span>
                    <Chip
                      color={getTypeColor(payment.payment_type)}
                      size="sm"
                      variant="flat"
                    >
                      {payment.payment_type.replace("_", " ")}
                    </Chip>
                  </div>
                  <div className="text-sm text-gray-600">
                    Property: {payment.property_id} •{" "}
                    {formatDate(payment.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    color="success"
                    size="sm"
                    onPress={() => updatePaymentStatus(payment.id, "completed")}
                  >
                    Confirm
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="light"
                    onPress={() => updatePaymentStatus(payment.id, "failed")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {/* All Payments */}
      <Card>
        <CardHeader>
          <h4 className="font-semibold">Payment History</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          {payments.length > 0 ? (
            payments.slice(0, 10).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">
                      {formatCurrency(payment.amount)}
                    </span>
                    <Chip
                      color={getTypeColor(payment.payment_type)}
                      size="sm"
                      variant="flat"
                    >
                      {payment.payment_type.replace("_", " ")}
                    </Chip>
                    <Chip
                      color={getStatusColor(payment.status)}
                      size="sm"
                      variant="flat"
                    >
                      {payment.status}
                    </Chip>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Property: {payment.property_id}</span>
                    <span>•</span>
                    <span>{formatDate(payment.created_at)}</span>
                    {payment.transaction_id && (
                      <>
                        <span>•</span>
                        <span>ID: {payment.transaction_id}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {payment.status === "pending" && (
                    <>
                      <Button
                        color="success"
                        size="sm"
                        variant="light"
                        onPress={() =>
                          updatePaymentStatus(payment.id, "completed")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() =>
                          updatePaymentStatus(payment.id, "failed")
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {payment.status === "processing" && (
                    <Button
                      color="success"
                      size="sm"
                      variant="light"
                      onPress={() =>
                        updatePaymentStatus(payment.id, "completed")
                      }
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconCreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No payments recorded</p>
              <p className="text-sm">Payment history will appear here</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Create Payment Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        size="lg"
        onOpenChange={setIsCreateModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create New Payment</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    required
                    label="Property ID"
                    placeholder="Enter property ID"
                    value={formData.property_id}
                    onChange={(e) =>
                      handleInputChange("property_id", e.target.value)
                    }
                  />

                  <Input
                    required
                    label="Amount (PHP)"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₱</span>
                      </div>
                    }
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                  />

                  <Select
                    label="Payment Type"
                    placeholder="Select payment type"
                    selectedKeys={
                      formData.payment_type ? [formData.payment_type] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as PaymentType;

                      handleInputChange("payment_type", value || "reservation");
                    }}
                  >
                    {paymentTypes.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Payment will be created in pending
                      status and require manual approval.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  disabled={
                    loading || !formData.property_id || !formData.amount
                  }
                  isLoading={loading}
                  onPress={handleCreatePayment}
                >
                  {loading ? "Creating..." : "Create Payment"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
