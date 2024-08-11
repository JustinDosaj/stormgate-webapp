"use client";
import { useRef } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { BookOpenIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useModal } from '@/context/ModalContext';
import { DeleteBuildFromFirebase, reportContentToFirebase } from '@/pages/api/firebase/functions';
import { TrashIcon } from '@heroicons/react/24/solid';

const statusIcons = {
  info: <BookOpenIcon className='text-violet-600 h-8 w-8' aria-hidden="true" />,
  error: <ExclamationTriangleIcon className='text-red-500 h-8 w-8' aria-hidden="true" />,
  success: <CheckCircleIcon className='text-green-500 h-8 w-8' aria-hidden="true" />,
  warning: <ExclamationTriangleIcon className='text-yellow-600 h-8 w-8' aria-hidden="true" />,
  auth: <InformationCircleIcon className='text-violet-600 h-8 w-8' aria-hidden="true" />,
  delete: <TrashIcon className='text-red-500 h-8 w-8' aria-hidden="true" />,
  report: <ExclamationTriangleIcon className='text-red-500 h-8 w-8' aria-hidden="true" />,
};

const borderColor = {
  info: 'border-violet-600/50',
  error: 'border-red-500/50',
  success: 'border-green-500/50',
  warning: 'border-yellow-600/50',
  auth: 'border-violet-600/50',
  delete: 'border-red-500/50',
  report: 'border-red-500/50',
};

const GlobalModal: React.FC = () => {
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const { isOpen, title, text, status, closeModal, buttonName, buildId, slug, userId } = useModal();

  const modalAction = {
    info: "/",
    error: "/",
    success: "/",
    warning: "/",
    auth: `/auth/login?redirect=/builds/${buildId?.toString()}/${slug}`,
    delete: async () => {
      if (userId && buildId) {
        await DeleteBuildFromFirebase({ userId: userId, buildId: buildId });
      }
    },
    report: async () => {
      if (userId && buildId && slug) {
        await reportContentToFirebase(slug, buildId, userId);
      }
    },
  };

  const onButtonClick = () => {
    if (status === 'delete') {
      modalAction.delete();
      router.push('/');
    } else if (status === 'report') {
      modalAction.report();
    } else {
      router.push(modalAction[status]);
    }
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 text-center">
        <div className="flex min-h-full items-center justify-center w-full">
          <DialogPanel
            className="relative transform overflow-hidden rounded-3xl bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 space-y-4"
          >
            <div className="text-center">
              <div className={`${borderColor[status]} mx-auto flex h-12 w-12 items-center justify-center border rounded-full`}>
                {statusIcons[status]}
              </div>
              <DialogTitle as="h3" className="text-xl lg:text-2xl font-semibold leading-6 text-white capitalize mt-4">
                {title}
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm lg:text-base text-gray-200">
                  {text}
                </p>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
                className="mt-3 inline-flex w-full justify-center rounded-3xl bg-violet-700 hover:bg-violet-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-2 sm:mt-0"
                onClick={onButtonClick}
            >
                {buttonName}
            </button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-3xl bg-gray-00 hover:bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0"
                onClick={closeModal}
                ref={cancelButtonRef}
            >
                Return
            </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GlobalModal;
