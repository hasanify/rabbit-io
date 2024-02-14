import {formatTime} from '@/lib/utils';
import {XSquareIcon} from 'lucide-react';
import {FC} from 'react';

type LogsProps = {
  logs: string[] | undefined;
  setLogs: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};
const Logs: FC<LogsProps> = ({logs, setLogs}) => {
  return (
    <>
      {logs && (
        <div
          className={
            'absolute z-[999] flex flex-col justify-center items-center backdrop-blur-sm bg-background-400/80 w-full h-full transition-all'
          }
        >
          <button
            className="absolute top-8 right-8 -translate-x-[100%]"
            onClick={() => setLogs(undefined)}
          >
            <XSquareIcon></XSquareIcon>
          </button>
          <div className="h-[80dvh] p-4 gap-0 rounded-md bg-foreground w-max max-w-[600px] overflow-y-scroll flex flex-col">
            {logs.map(log => {
              const timestamp = new Date(parseInt(log.split(':')[0])).toISOString();
              const message = log.replace(log.split(':')[0], '').slice(1);

              return (
                <div className="flex flex-row items-start justify-start gap-1">
                  <div className="text-base text-background/50 whitespace-nowrap">
                    [{formatTime(timestamp, true, true)}]
                  </div>
                  <div className="text-lg break-words text-background">{message}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Logs;
