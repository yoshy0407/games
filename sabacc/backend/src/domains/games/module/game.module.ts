import { Module } from "@nestjs/common";
import { BettingDomainService } from "../service/betting.domain.service";
import { JoinDomainService } from "../service/join.domain.service";
import { ShiftingDomainService } from "../service/shifting.domain.service";
import { CallingDomainService } from "../service/calling.domain.service";

@Module({
    providers: [
        JoinDomainService,
        BettingDomainService,
        ShiftingDomainService,
        CallingDomainService
    ]
})
export class GameModule { }