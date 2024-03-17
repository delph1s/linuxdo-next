import Button from '@components/button/mui-button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useRef } from 'react';

type LeveltrustDialogProps = {
  open: boolean;
  toggleOpen: (state?: boolean) => void;
};

function LeveltrustDialog({ open = false, toggleOpen }: LeveltrustDialogProps) {
  const connectLinuxDoIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const connectLinuxDoListener = (e: MessageEvent<any>) => {
      console.log(e.data);
    };

    window.addEventListener('message', connectLinuxDoListener);

    return () => {
      window.removeEventListener('message', connectLinuxDoListener);
    };
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => toggleOpen(false)}
      aria-labelledby="leveltrust-info-dialog-title"
      aria-describedby="leveltrust-info-dialog-description"
    >
      <DialogTitle id="leveltrust-info-dialog-title">用户等级信息</DialogTitle>
      <DialogContent>
        <DialogContentText id="leveltrust-info-dialog-description">
          你的用户等级为2级，精确信息通过 connect.linux.do 查询
        </DialogContentText>
        <iframe
          title="levelTrustInfo"
          ref={connectLinuxDoIframeRef}
          // scrolling="yes"
          // frameBorder="0"
          style={{ width: '100%', height: '800px', overflow: 'visible', border: 'none', borderRadius: '0.5rem' }}
          // onLoad={() => {
          //   //iframe高度不超过content的高度即可
          //   let h = document.documentElement.clientHeight - 20;
          //   this.setState({
          //     iFrameHeight: h + 'px',
          //   });
          // }}
          src="https://connect.linux.do/"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleOpen(false)}>Disagree</Button>
        <Button onClick={() => toggleOpen(false)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeveltrustDialog;
