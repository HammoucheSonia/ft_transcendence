import { Controller, Get, Query } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';

import { AxiosResponse } from 'axios';

@Controller('api')
export class ApiController {
	
	constructor(private readonly http_service: HttpService) {}

	@Get('auth/callback')
	async authCallback(@Query('code') code: string): Promise<string>
	{
		const client_id = 'u-s4t2ud-5be0fa24ac9238db0cfd76b65b91ac16fdda9000575a13fd036b2cdcb4d95cfa';
		const client_secret = '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';
		
		const payload =
		{
			client_id: client_id,
			client_secret: client_secret,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: 'http://localhost:8080/api/auth/callback',
		};

		try {

			const token_response: AxiosResponse = await this.http_service.post('https://api.intra.42.fr/oauth/token', payload)
					.toPromise();

			const access_token = token_response.data.access_token;
			
			// Use access token to get user information
			const userResponse: AxiosResponse = await this.http_service.get('https://api.intra.42.fr/v2/me',
			{
				headers: { 'Authorization': `Bearer ${access_token}` }
			}).toPromise();

			return 'Auth successful';

		} catch (error) {
			console.log(error);
			return 'Auth failed';
		}
	}
}