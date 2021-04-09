
class LogicalBuffer {

    uuid: string;
    currentStepIndex: number = 0;
    steps: LogicalStep[] = [];
    storedData: {} = {};

	
	process(gameState): boolean{
	
		if(this.steps.length <= 0){
			return true;
		}
		
		var isLogicalBufferComplete: boolean = false;
		var currentStep: LogicalStep = this.steps[this.currentStepIndex];
		var isStepComplete: boolean = currentStep.process(this, gameState);
		
		if(isStepComplete){
			this.currentStepIndex++;
			if(this.currentStepIndex >= this.steps.length){
				isLogicalBufferComplete = true;
			}
		}
		
		return isLogicalBufferComplete;
	}
	

}
