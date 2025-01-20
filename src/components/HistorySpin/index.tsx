'use client';

import { getSpinHistoryAsync } from '@/app/server/spinWheel';
import { useUser } from '@/hooks/useUser';
import { History } from '@/types';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const HistorySpin = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { userInfo } = useUser();
  const [history, setHistory] = useState<History[]>([]);
  const getHistory = async (id: string) => {
    try {
      const res = await getSpinHistoryAsync(id);
      if (res?.data) {
        setHistory(res.data as History[]);
        toast.success(res.message || 'Data fetched successfully');
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to fetch history');
    }
  };
  useEffect(() => {
    if (isOpen && userInfo?.id) {
      getHistory(userInfo.id);
    }
  }, [isOpen, userInfo?.id]);
  const formattedDate = (time: Date) => {
    return time.toLocaleDateString('vi-VN');
  };
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="border-white border-2 text-xl"
      >
        Lịch sử
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Lịch sử lì xì
              </ModalHeader>
              <ModalBody>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>Tên</TableColumn>
                    <TableColumn>Số tiền</TableColumn>
                    <TableColumn>Thời gian</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {history ? (
                      history.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.rewardValue} VND</TableCell>
                            <TableCell>
                              {formattedDate(item.spinTime)}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <h1>Chưa ai nhận được lì xì</h1>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default HistorySpin;
