// components/shared/GlobalModal.tsx
"use client";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import dynamic from 'next/dynamic';
import { BookOpenIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useModal } from '@/context/ModalContext';

/*const AdSenseDisplay = dynamic(() => import('@/components/tags/adsense'), {
  ssr: false,
  loading: () => <div style={{ height: '90px' }} />,
});*/

const statusIcons = {
  info: <BookOpenIcon className='text-violet-600 h-8 w-8' aria-hidden="true" />,
  error: <ExclamationTriangleIcon className='text-red-500 h-8 w-8' aria-hidden="true" />,
  success: <CheckCircleIcon className='text-green-500 h-8 w-8' aria-hidden="true" />,
  warning: <ExclamationTriangleIcon className='text-yellow-600 h-8 w-8' aria-hidden="true" />,
  auth: <InformationCircleIcon className='text-violet-600 h-8 w-8' aria-hidden="true" />,
};

const borderColor = {
    info: 'border-violet-600/50',
    error: 'border-red-500/50',
    success: 'border-green-500/50',
    warning: 'border-yellow-600/50',
    auth: 'border-violet-600/50',
}


const GlobalModal: React.FC = () => {
    
    const cancelButtonRef = useRef(null);
    const router = useRouter();
    const { isOpen, title, text, displayAd, status, closeModal, buttonName, id, slug } = useModal();

    const modalAction = {
        info: "/",
        error: "/",
        success: "/",
        warning: "/",
        auth: `/auth/login?redirect=/builds/${id?.toString()}/${slug}`,
    }

    const onButtonClick = () => {
        router.push(modalAction[status]);
        closeModal();
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={closeModal}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4 text-center">
                    <div className="flex min-h-screen items-center justify-center w-full">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 space-y-4">
                                <div>
                                    <div className={`${borderColor[status]} mx-auto flex h-12 w-12 items-center justify-center border rounded-full`}>
                                        {statusIcons[status]}
                                    </div>
                                    <div className="mt-1 text-center space-y-1">
                                        <Dialog.Title as="h3" className="text-xl lg:text-2xl font-semibold leading-6 text-white capitalize">
                                        {title}
                                        </Dialog.Title>
                                        <p className="text-sm lg:text-base text-gray-200">
                                            {text}
                                        </p>
    
                                    </div>
                                </div>

                                {/*<div className={displayAd ? `w-[260px] md:w-[336px] mx-auto` : `hidden`}>
                                    <AdSenseDisplay adSlot="9250004753" adFormat="rectangle" widthRes="true" maxHeight="250px"/>
                                </div>*/}

                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-gray-800 hover:bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-2 sm:mt-0"
                                    onClick={onButtonClick}
                                >
                                    {buttonName}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-gray-700 hover:bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0"
                                    onClick={closeModal}
                                    ref={cancelButtonRef}
                                >
                                    Return
                                </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default GlobalModal;
