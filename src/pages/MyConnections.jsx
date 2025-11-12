import { useEffect, useLayoutEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Pen, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'kitzo/react';
import MyConnectionUpdateModal from '../components/partials/MyConnectionUpdateModal';

function MyConnections() {
  const server = useAxios();
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await server.get('/partner-request/all-requests');
        setConnections(response.data.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    })();
  }, []);

  // delete connection
  const [deleting, setDeleting] = useState(false);
  const [deleteConnection, setDeleteConnection] = useState(null);

  useEffect(() => {
    document.body.style.overflow = deleteConnection ? 'hidden' : 'auto';
  }, [deleteConnection]);

  async function sendConnectionDeleteRequest() {
    try {
      const response = await server.post('/partner-request/remove-connection', {
        originalId: deleteConnection.originalId,
        _id: deleteConnection._id,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async function triggerDelete() {
    setDeleting(true);

    toast.promise(
      sendConnectionDeleteRequest(),
      {
        loading: 'Removing connection',
        success: (data) => {
          console.log(data);
          setConnections((prev) =>
            prev.filter((p) => p._id !== deleteConnection._id),
          );
          setDeleteConnection(null);
          setDeleting(false);
          return 'Connection successfully removed';
        },
        error: (err) => {
          setDeleting(false);
          console.log(err);
          return 'Failed while removing connection';
        },
      },
      {
        duration: 3000,
        style: { color: 'black' },
      },
    );
  }

  // update connection
  const [updateInfo, setUpdateInfo] = useState(null);

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="mb-4 pl-1 text-lg font-medium md:text-2xl">
          My connections {connections.length > 0 && <>({connections.length})</>}
        </h1>

        {dataLoading ? (
          <div className="grid min-h-[200px] place-items-center">
            <div className="loading loading-spinner loading-sm"></div>
          </div>
        ) : (
          <>
            {connections.length < 1 ? (
              <div className="grid min-h-[200px] place-items-center">
                <div className="text-center opacity-80 max-sm:text-sm">
                  Your connections with appear here
                </div>
              </div>
            ) : (
              <div className="w-full overflow-x-auto pb-2 max-md:w-[clamp(20rem,-1.75rem+100vw,47.9375rem)]">
                <div className="min-w-[550px] overflow-hidden rounded-xl border border-(--table-border-clr) bg-(--white) transition-colors duration-150">
                  <table border="1" className="w-full">
                    <thead>
                      <tr className="bg-(--accent-color)/40 transition-colors duration-150">
                        <th className="border-b border-(--table-border-clr) px-4 py-2 font-normal">
                          No.
                        </th>
                        <th className="border-b border-(--table-border-clr) px-4 py-2 text-start font-normal">
                          Partner profile
                        </th>
                        <th className="border-b border-(--table-border-clr) px-4 py-2 text-start font-normal">
                          Study Mode
                        </th>
                        <th className="border-b border-(--table-border-clr) px-4 py-2 font-normal">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {connections.map((c, i) => {
                        const {
                          name,
                          profileImage,
                          studyMode,
                          email,
                          _id,
                          originalId,
                        } = c;

                        return (
                          <tr
                            key={_id}
                            className="transition-colors duration-200 hover:bg-zinc-500/5"
                          >
                            <td className="border-t border-(--table-border-clr)">
                              <div className="grid place-items-center">
                                <span>{i + 1}</span>
                              </div>
                            </td>
                            <td className="border-t border-(--table-border-clr)">
                              <div className="p-2">
                                <div className="relative flex w-fit items-center gap-2">
                                  <button
                                    className="absolute inset-0 z-1"
                                    onClick={() =>
                                      navigate(`/partner/${originalId}`)
                                    }
                                  ></button>
                                  <div className="size-[30px] overflow-hidden rounded-full md:size-[30px]">
                                    <img
                                      className="size-full object-cover object-top"
                                      draggable="false"
                                      src={profileImage}
                                      alt={`${name} profile photo.`}
                                    />
                                  </div>

                                  <div className="grid h-fit">
                                    <span className="text-sm leading-4">
                                      {name}
                                    </span>
                                    <span className="text-xs leading-4 font-light tracking-wide opacity-70">
                                      {email}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="border-t border-(--table-border-clr) pl-4">
                              <span className="flex w-fit items-center gap-1 rounded-md bg-(--white) py-0.5 pr-1.5 pl-1 text-xs shadow ring-1 ring-zinc-500/10 transition-colors duration-150">
                                <span
                                  className={`size-1.5 rounded-full ${studyMode === 'Online' ? 'bg-emerald-300' : 'bg-zinc-500/40'}`}
                                ></span>
                                <span>{studyMode}</span>
                              </span>
                            </td>

                            <td className="border-t border-(--table-border-clr)">
                              <div className="flex justify-center gap-0.5">
                                <button
                                  onClick={() => {
                                    setDeleteConnection({ ...c });
                                  }}
                                  className="group grid size-6 place-items-center rounded-md transition-colors duration-150 max-sm:size-7 pointer-fine:hover:bg-(--accent-color)"
                                >
                                  <Trash2
                                    size="16"
                                    className="opacity-60 group-hover:opacity-80"
                                  />
                                </button>
                                <button
                                  onClick={() => setUpdateInfo({ ...c })}
                                  className="group grid size-6 place-items-center rounded-md transition-colors duration-150 max-sm:size-7 pointer-fine:hover:bg-(--accent-color)"
                                >
                                  <Pen
                                    size="14"
                                    className="opacity-60 group-hover:opacity-80"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {deleteConnection && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onMouseDown={() => setDeleteConnection(null)}
            className="fixed inset-0 z-25 flex items-center justify-center bg-black/30 p-4 dark:bg-black/50"
          >
            <motion.div
              initial={{
                scale: 1.2,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full max-w-[400px] rounded-xl bg-(--modal-bg) p-4 shadow-md"
            >
              <h3 className="text-xl font-medium">Delete this connection?</h3>
              <p className="mt-2 leading-5 opacity-80">
                Your connection with{' '}
                <button
                  className="font-semibold"
                  onClick={() => {
                    document.body.style.overflow = 'auto';
                    navigate(`/partner/${deleteConnection.originalId}`);
                  }}
                >
                  {deleteConnection.name}
                </button>{' '}
                will be removed.
              </p>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => setDeleteConnection(null)}
                  className="h-9 w-24 rounded-full bg-(--white) text-sm tracking-wide shadow dark:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleting) return;
                    triggerDelete();
                  }}
                  className="grid h-9 w-24 place-items-center rounded-full bg-red-500/50 text-sm tracking-wide shadow"
                >
                  {deleting ? (
                    <span className="loading loading-spinner loading-sm opacity-70"></span>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {updateInfo && (
          <MyConnectionUpdateModal
            state={{ updateInfo }}
            func={{ setUpdateInfo, setConnections }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default MyConnections;
