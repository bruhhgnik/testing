import { Canvas } from "@react-three/fiber";
import { TransactionPopup } from "../components/ui/TransactionPopup";
import { usePlayerMovement } from "../dojo/hooks/usePlayerMovement";
import useAppStore from "../zustand/store";
import { MainMenu } from "../components/ui/MainMenu";
import { RacingGame } from "../components/game/RacingGame";
import { RacingHUD } from "../components/ui/RacingHUD";
import { CountdownOverlay } from "../components/ui/CountdownOverlay";
import { Leaderboard } from "../components/ui/Leaderboard";
import { CarSelectionScreen } from "../components/ui/CarSelectionScreen";
import { TxnsProgressBar } from "../components/ui/TxnsProgressBar";

const App = () => {
  const { gameStarted, carSelectionComplete } = useAppStore();

  // Track onchain movement
  const {
    showTransactionPopup,
    transactionError,
    isProcessingTransaction,
    closeTransactionPopup,
  } = usePlayerMovement();

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Show main menu if game hasn't started */}
      {!gameStarted && !carSelectionComplete && <MainMenu />}

      {/* Car Selection Screen - shown after clicking start but before game */}
      {gameStarted && !carSelectionComplete && <CarSelectionScreen />}

      {/* Racing HUD - Speedometer, Position, Time, etc. */}
      {gameStarted && carSelectionComplete && <RacingHUD />}

      {/* Countdown overlay */}
      {gameStarted && carSelectionComplete && <CountdownOverlay />}

      {/* Leaderboard */}
      {gameStarted && carSelectionComplete && <Leaderboard />}

      {/* Txns Progress Bar */}
      {gameStarted && carSelectionComplete && <TxnsProgressBar />}

      {/* 3D Canvas - Racing Game */}
      {gameStarted && carSelectionComplete && (
        <Canvas
          camera={{ position: [0, 15, 20], fov: 75 }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <RacingGame />
        </Canvas>
      )}

      {/* Transaction popup for onchain movements */}
      <TransactionPopup
        isVisible={showTransactionPopup}
        isLoading={isProcessingTransaction}
        error={transactionError}
        onClose={closeTransactionPopup}
      />
    </div>
  );
};

export default App;
