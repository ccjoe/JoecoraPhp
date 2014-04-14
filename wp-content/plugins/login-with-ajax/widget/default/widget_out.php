<?php 
/*
 * This is the page users will see logged out. 
 * You can edit this, but for upgrade safety you should copy and modify this file into your template folder.
 * The location from within your template folder is plugins/login-with-ajax/ (create these directories if they don't exist)
*/
?>  
    <h3>请登录</h3>
	<div class="lwa lwa-default"><?php //class must be here, and if this is a template, class name should be that of template directory ?>
        <form class="lwa-form" action="<?php echo esc_attr(LoginWithAjax::$url_login); ?>" method="post">
            
            <table>
                <tr class="lwa-username">
                    <td class="lwa-username-label">
                        <label><?php esc_html_e( 'Username','login-with-ajax' ) ?></label>
                    </td>
                    <td class="lwa-username-input">
                        <input type="text" name="log" />
                    </td>
                </tr>
                <tr class="lwa-password">
                    <td class="lwa-password-label">
                        <label><?php esc_html_e( 'Password','login-with-ajax' ) ?></label>
                    </td>
                    <td class="lwa-password-input">
                        <input type="password" name="pwd" />
                    </td>
                </tr>
                <tr><td colspan="2"><?php do_action('login_form'); ?></td></tr>
                <tr class="lwa-submit">
                    <td class="lwa-submit-button">
                        <input type="submit" name="wp-submit" id="lwa_wp-submit" value="<?php esc_attr_e('Log In', 'login-with-ajax'); ?>" tabindex="100" />
                        <input type="hidden" name="lwa_profile_link" value="<?php echo esc_attr($lwa_data['profile_link']); ?>" />
                        <input type="hidden" name="login-with-ajax" value="login" />
                    </td>
                    <td class="lwa-submit-links">
                        <input name="rememberme" type="checkbox" class="lwa-rememberme" value="forever" /> <label><?php esc_html_e( '记住我','login-with-ajax' ) ?></label>
                        
						<?php if( !empty($lwa_data['remember']) ): ?>
						<a class="lwa-links-remember" href="<?php echo esc_attr(LoginWithAjax::$url_remember); ?>" title="<?php esc_attr_e('Password Lost and Found','login-with-ajax') ?>"><?php esc_attr_e('忘了?','login-with-ajax') ?></a>
						<?php endif; ?>
                        <?php if ( get_option('users_can_register') && !empty($lwa_data['registration']) ) : ?>
						
						<a href="<?php echo esc_attr(LoginWithAjax::$url_register); ?>" class="lwa-links-register lwa-links-modal"><?php esc_html_e('注册?','login-with-ajax') ?></a>
                        <?php endif; ?>
                    </td>
                </tr>
            </table>
            <span class="lwa-status"></span>
        </form>
        <?php if( !empty($lwa_data['remember']) ): ?>
        <form class="lwa-remember" action="<?php echo esc_attr(LoginWithAjax::$url_remember) ?>" method="post" style="display:none;">
        	<span class="lwa-status"></span>
            <table>
                <tr>
                    <td>
                        <strong><?php esc_html_e("忘记密码", 'login-with-ajax'); ?></strong>         
                    </td>
                </tr>
                <tr>
                    <td class="lwa-remember-email">  
                        <?php $msg = __("输入用户名或email", 'login-with-ajax'); ?>
                        <input type="text" name="user_login" class="lwa-user-remember" value="<?php echo esc_attr($msg); ?>" onfocus="if(this.value == '<?php echo esc_attr($msg); ?>'){this.value = '';}" onblur="if(this.value == ''){this.value = '<?php echo esc_attr($msg); ?>'}" />
                        <?php do_action('lostpassword_form'); ?>
                    </td>
                </tr>
                <tr>
                    <td class="lwa-remember-buttons">
                        <input type="submit" value="<?php esc_attr_e("获取新密码", 'login-with-ajax'); ?>" class="lwa-button-remember" />
                        <a href="#" class="lwa-links-remember-cancel"><?php esc_html_e("取消", 'login-with-ajax'); ?></a>
                        <input type="hidden" name="login-with-ajax" value="remember" />
                    </td>
                </tr>
            </table>
        </form>
        <?php endif; ?>
		<?php if( get_option('users_can_register') && !empty($lwa_data['registration']) ): ?>
		<div class="lwa-register lwa-register-default lwa-modal" style="display:none;">
			<h4><?php esc_html_e('在此站点注册','login-with-ajax') ?> <em class="lwa-register-tip"><?php esc_html_e('密码将发送到Email','login-with-ajax') ?></em></h4>
			
			<form class="lwa-register-form" action="<?php echo esc_attr(LoginWithAjax::$url_register); ?>" method="post">
				<span class="lwa-status"></span>
				<p class="lwa-username">
					<label><?php esc_html_e('用户名','login-with-ajax') ?></label>
					<input type="text" name="user_login" id="user_login" class="input" size="20" tabindex="10" />
				</p>
				<p class="lwa-email">
					<label><?php esc_html_e('E-mail','login-with-ajax') ?></label>
					<input type="text" name="user_email" id="user_email" class="input" size="25" tabindex="20" />
				</p>
				<?php do_action('register_form'); ?>
				<?php do_action('lwa_register_form'); ?>
				<p class="submit">
					<input type="submit" name="wp-submit" id="wp-submit" class="button-primary" value="<?php esc_attr_e('注册', 'login-with-ajax'); ?>" tabindex="100" />
				</p>
		        <input type="hidden" name="login-with-ajax" value="register" />
			</form>
		</div>
		<?php endif; ?>
	</div>